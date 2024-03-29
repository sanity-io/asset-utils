/**
 * Yeah this isn't the prettiest code, but it's just a simple docs generator
 */

/* eslint-disable no-process-exit, id-length, no-console, @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type, no-sync */
const fs = require('fs')
const path = require('path')
const outdent = require('outdent')
const childProcess = require('child_process')
const cheerio = require('cheerio')
const pkg = require('../package.json')

const basePath = path.resolve(__dirname, '..')
const gitHash = childProcess
  .execSync('git rev-parse --short HEAD', {cwd: basePath, encoding: 'utf8'})
  .trim()

const doCommit = process.argv.includes('--commit')
const ghUrl = pkg.homepage.replace(/#.*/, '').replace(/\/+$/, '')
const slugRe = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g
const htmlDocsUrl = `https://sanity-io.github.io/asset-utils/`

let docs
let allNodes
let functions

const mdFilename = 'README.md'
const mdTemplate = fs.readFileSync(path.join(__dirname, '..', 'README.template.md'), 'utf8')
const mdBase = `<!-- This file is AUTO-GENERATED, edit README.template.md or tweak scripts/generateReadme.js -->\n${mdTemplate}`

generateHtmlDocs()
modifyHtmlDocs()
readJsonDocs()
extractFunctions()
createMarkdownDocs()
prettify()

if (doCommit) {
  commit()
}

/**
 * Utilities
 */
function readJsonDocs() {
  try {
    docs = require('../docs/docs.json')
  } catch (err) {
    console.error(`Failed to read ${path.resolve(__dirname, '..', 'docs', 'docs.json')}`)
    process.exit(1)
  }
}

function extractFunctions() {
  allNodes = docs.children.map(remapConstFunction)
  functions = groupByKind(allNodes).Function
}

function remapConstFunction(item, index, siblings) {
  const functionKind = siblings.find((sib) => sib.kindString === 'Function').kind
  const {kindString, name, id, sources, flags = {}, comment} = item
  if (
    kindString !== 'Variable' ||
    !flags.isExported ||
    !flags.isConst ||
    !comment ||
    !comment.tags ||
    !comment.tags.some((tag) => tag.tag === 'inheritfrom')
  ) {
    return item
  }

  const inheritsFrom = comment.tags
    .find((tag) => tag.tag === 'inheritfrom')
    .text.replace(/\{@link\s+(.*?)\}.*/, '$1')

  const parent = siblings.find((sibling) => sibling.name === inheritsFrom)
  if (!parent) {
    throw new Error(`Failed to find referenced inheritsFrom: ${inheritsFrom}`)
  }

  const isTryFn = item.name.startsWith('try')
  const {signatures: parentSignatures, flags: parentFlags} = parent
  const signatures = parentSignatures.map((signature) => ({
    ...signature,
    name: item.name,
    id: item.id,
    comment: mergeComments(signature.comment, item.comment, {isTryFn}),
  }))

  return {
    id,
    name,
    kind: functionKind,
    kindString: 'Function',
    flags: {...parentFlags},
    signatures,
    sources,
  }
}

function mergeComments(original, override, options = {isTryFn: false}) {
  if (!original || !options.isTryFn) {
    return override
  }

  const returns = original.returns || ''
  const join = (base, add) => [base.replace(/[\s.]+$/, ''), add].join('. ')

  return {
    ...original,
    tags: (original.tags || []).filter((tag) => tag.tag !== 'throws' && tag.tag !== 'inheritfrom'),
    returns:
      returns &&
      join(returns, `Returns \`undefined\` instead of throwing if a value cannot be resolved.`),
  }
}

function groupByKind(items) {
  const kinds = {}
  for (const item of items) {
    const kind = item.kindString
    kinds[kind] = kinds[kind] || []
    kinds[kind].push(item)
  }

  for (const group of Object.values(kinds)) {
    // Sort mutates in place, which is why this works
    group.sort((a, b) => a.name.localeCompare(b.name))
  }

  return kinds
}

function slugify(str) {
  if (typeof str !== 'string') {
    return ''
  }

  return str
    .trim()
    .replace(/[A-Z]+/g, (sub) => sub.toLowerCase())
    .replace(/<[^>\d]+>/g, '')
    .replace(slugRe, '')
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/^(\d)/, '_$1')
}

function createMarkdownDocs() {
  const content = mdBase.trimLeft().replace(/## License/, `${createMarkdownBody()}\n\n## License`)
  fs.writeFileSync(path.join(__dirname, '..', mdFilename), content)
}

function createMarkdownToc() {
  return outdent`
    ### Functions

    ${functions
      .map((child) => `- [${child.name}](${mdFilename}#${slugify(child.name)})`)
      .join('\n')}
  `
}

function createMarkdownBody() {
  const header = outdent`
  ## Documentation

  An [HTML version](https://sanity-io.github.io/asset-utils/) is also available, which also includes interface definitions, constants and more.
  `
  const toc = createMarkdownToc()
  const fns = functions.map((child) => createMarkdownSegment('Function', child)).join('\n\n')
  return `${header}\n\n${toc}\n\n${fns}`
}

function createMarkdownSegment(kind, node) {
  switch (kind) {
    case 'Function':
      return createMarkdownFnDoc(node)
    case 'Variable':
      return createMarkdownConstDoc(node)
    case 'Interface':
      return createInterfaceDoc(node)
    default:
      return ''
  }
}

function createInterfaceDoc(node) {
  if (!node.flags.isExported) {
    return ''
  }

  const description = node.comment && node.comment.shortText ? `\n${node.comment.shortText}\n` : ''
  const properties = node.children.filter((child) => child.kindString === 'Property')
  const propTable =
    (properties.length > 0 && `${bold('Properties:')}\n\n${generateParamsTable(properties)}`) || ''

  return outdent`
    ### ${node.name}
    ${description}
    ${propTable}

    ${em(`Defined in ${srcLink(node.sources[0])}`)}
  `
}

function createMarkdownConstDoc(node) {
  if (!node.flags.isConst || !node.flags.isExported || node.name.toUpperCase() !== node.name) {
    return ''
  }

  const defaultValue = node.defaultValue.includes('\n')
    ? `\n${codeBlock(node.defaultValue)}`
    : node.defaultValue

  const description = node.comment && node.comment.shortText ? `\n${node.comment.shortText}\n` : ''

  return outdent`
    ### ${node.name}
    ${description}
    • ${bold(node.name)}: ${createMarkdownReturnValue(node)} = ${defaultValue}

    ${em(`Defined in ${srcLink(node.sources[0])}`)}
  `
}

function createMarkdownParameterSignature(param) {
  const type = formatMarkdownRef(param.type)
  return `${code(param.name)}: ${type}`
}

function sortUnionTypes(types) {
  const undefinedIndex = types.findIndex((type) => type.name === 'undefined')
  if (undefinedIndex === -1) {
    return types
  }

  const sorted = types.slice()
  const [undef] = sorted.splice(undefinedIndex, 1)
  return sorted.concat(undef)
}

function getUrlForNode(node) {
  const isFunction = node.kindString === 'Function'
  const slug = slugify(node.name)
  if (isFunction) {
    return `${mdFilename}#${slug}`
  }

  if (node.kindString === 'Interface') {
    return `${htmlDocsUrl}/interfaces/${slug}.html`
  }

  if (node.kingString === 'Class') {
    return `${htmlDocsUrl}/classes/${slug}.html`
  }

  return `${htmlDocsUrl}/index.html#${slug}`
}

function formatMarkdownRef(thing) {
  const refNode =
    thing.type === 'reference' &&
    allNodes.find((node) => (thing.id ? node.id === thing.id : node.name === thing.name))

  if (refNode) {
    const url = getUrlForNode(refNode)
    return `[${thing.name}](${url})`
  }

  if (thing.type === 'reference' || thing.type === 'intrinsic') {
    return thing.name
  }

  if (thing.type === 'union') {
    return sortUnionTypes(thing.types)
      .map((type) => formatMarkdownRef(type))
      .join(' | ')
  }

  if (thing.type === 'predicate') {
    return `${thing.name} is ${formatMarkdownRef(thing.targetType)}`
  }

  if (thing.type === 'stringLiteral') {
    return JSON.stringify(thing.value, null, 2)
  }

  if (thing.type === 'reflection') {
    return 'unknown'
  }

  throw new Error(`Unknown parameter type: ${JSON.stringify(thing, null, 2)}`)
}

function createMarkdownReturnValue(sig) {
  const returnType = formatMarkdownRef(sig.type)
  return em(returnType)
}

function createMarkdownFnSignature(sig) {
  const params = sig.parameters || []
  const description = sig.comment && sig.comment.shortText ? `${sig.comment.shortText}` : ''
  const paramsTable = generateParamsTable(params)
  const returns = `${bold('Returns:')} ${createMarkdownReturnValue(sig)}`
  const signature = []
    .concat(`▸ ${bold(sig.name)}(`)
    .concat(params.map(createMarkdownParameterSignature).join(', '))
    .concat(`): ${createMarkdownReturnValue(sig)}`)
    .join('')

  return [signature].concat(description).concat(paramsTable).concat(returns).join('\n\n')
}

function generateParamsTable(params) {
  const paramsHasDescription = params.some((param) => param.comment && param.comment.text)
  const headers = paramsHasDescription ? `| Name | Type | Description |` : '| Name | Type |'
  const separat = paramsHasDescription ? `| ---- | ---- | ----------- |` : '| ---- | ---- |'
  const rows = params.map((param) => {
    const type = formatMarkdownRef(param.type)
    const description = paramsHasDescription
      ? [param.comment ? param.comment.text || param.comment.shortText : '']
      : []

    const parts = ['', code(param.name), type, ...description, ''].map((part) =>
      part.replace(/\|/g, '\\|')
    )
    return parts.join(' | ').trim()
  })

  return [headers, separat, ...rows].join('\n')
}

function createMarkdownFnDoc(fn) {
  return outdent`
  ### ${fn.name}

  ${fn.signatures.map(createMarkdownFnSignature).join('\n')}

  ${fn.sources.map((src) => em(`Defined in ${srcLink(src)}`)).join('\n')}
  `
}

function codeBlock(str, language = 'js') {
  return outdent`
    \`\`\`${language}
    ${str}
    \`\`\`
  `
}

function code(str) {
  return `\`${str}\``
}

function em(str) {
  return `_${str}_`
}

function bold(str) {
  return `**${str}**`
}

function srcLink(src) {
  return `[${src.fileName}:${src.line}](${srcUrl(src)})`
}

function srcUrl(src) {
  return `${ghUrl}/blob/${gitHash}/${src.fileName}#L${src.line}`
}

function prettify() {
  childProcess.spawnSync(path.join(__dirname, '..', 'node_modules', '.bin', 'prettier'), [
    '--write',
    path.join(__dirname, '..', 'README.md'),
  ])
}

function commit() {
  childProcess.spawnSync('git', ['add', 'README.md'], {
    cwd: basePath,
    stdio: 'inherit',
  })

  childProcess.spawnSync('git', ['commit', '-m', 'docs(readme): generate new readme from source'], {
    cwd: basePath,
    stdio: 'inherit',
  })
}

function generateHtmlDocs() {
  childProcess.spawnSync(path.join(__dirname, '..', 'node_modules', '.bin', 'typedoc'), {
    cwd: basePath,
    stdio: 'inherit',
  })
}

function modifyHtmlDocs() {
  const htmlPath = path.join(__dirname, '..', 'docs', 'index.html')
  const $ = cheerio.load(fs.readFileSync(htmlPath))

  // Get constants that start with `try` and treat them as functions
  $('.tsd-kind-variable > a[href*="#try"]')
    .parent()
    .removeClass('tsd-kind-variable')
    .addClass('tsd-kind-function')

  // Move constants that are functions from the constants blocks to the functions block
  const fnsInConstIndex = $('.tsd-index-section h3:contains("Variables")')
    .closest('section')
    .find('.tsd-kind-function')

  // Move the functions to the top of the index
  const fnsIndexSection = $('.tsd-index-section h3:contains("Functions")').closest('section')
  fnsIndexSection.parent().prepend(fnsIndexSection)

  const fnsListSection = $('.tsd-member-group h2:contains("Functions")').closest(
    '.tsd-member-group'
  )
  fnsListSection.parent().find('.tsd-index-group').after(fnsListSection)

  // Move constants that are functions from the variables list to the functions list
  const fnsInList = $('.tsd-member-group h2:contains("Variables")')
    .closest('section')
    .find('a[name^="try"]')
    .closest('.tsd-member')
    .removeClass('tsd-kind-variable')
    .addClass('tsd-kind-function')
    .appendTo(fnsListSection)

  // Find all "const" flags in the functions list, and remove them
  fnsListSection.find('.ts-flagConst').remove()
  fnsInList.find('a[name^="try"]').each(function () {
    const a = $(this)
    const target = a.attr('name').replace(/^try/, '')
    const section = a.closest('section')
    const parent = a.closest('.tsd-member-group').find(`a[name="${target}"]`).closest('section')
    const parentSig = parent.find('.tsd-signatures')
    const signature = parentSig.clone()
    signature
      .find('.tsd-signature')
      .append(
        '<span class="tsd-signature-symbol"> | </span><span class="tsd-signature-type">undefined</span>'
      )

    section.find('.tsd-signature').replaceWith(signature)
  })

  // Move classes to the top of the index
  const classesIndexSection = $('.tsd-index-section h3:contains("Classes")').closest('section')
  classesIndexSection.parent().append(classesIndexSection)

  // Append the "try" functions (previously constants) to the functions list
  fnsIndexSection.find('ul').append(fnsInConstIndex)

  // Move the functions to the top of the navigation
  const nav = $('.tsd-navigation ul')
  const fns = orderNodesByName(nav.find('.tsd-kind-function'), $)
  nav.prepend(fns)

  // Don't reference "globals.html", use index!
  $('a[href^="globals.html"]').each(function () {
    const el = $(this)
    el.attr('href', el.attr('href').replace('globals.html', 'index.html'))
  })

  // If encountering (broken) @link tags - throw
  $(':contains("@link")').each(function () {
    const html = $(this).html()
    html.replace(/{@link (.*?)}/g, (match, target) => {
      throw new Error(`Found BROKEN @link reference to "${target}"`)
    })
  })

  // Remove filters, as they are noops in our case
  $('#tsd-filter').html(outdent`
    <a href="https://github.com/sanity-io/asset-utils" style="display: flex;">
      <svg style="width: 24px; margin-right: 5px;" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      Fork me on GitHub
    </a>
  `)

  fs.writeFileSync(htmlPath, $.html())
}

function orderNodesByName(nodes, $) {
  return nodes
    .toArray()
    .slice()
    .sort((a, b) => {
      const aName = $(a).text().trim()
      const bName = $(b).text().trim()
      return aName.localeCompare(bName)
    })
}
