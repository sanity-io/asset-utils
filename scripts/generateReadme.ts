/**
 * Yeah this isn't the prettiest code, but it's just a simple docs generator
 */

import childProcess from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {parseArgs} from 'node:util'

import * as cheerio from 'cheerio'
import outdent from 'outdent'
import {JSONOutput, ReflectionKind} from 'typedoc'

const {values: flags} = parseArgs({
  options: {commit: {type: 'boolean', default: false}, tag: {type: 'string'}},
})

const basePath = path.resolve(import.meta.dirname, '..')

const pkg = JSON.parse(fs.readFileSync(path.resolve(basePath, 'package.json'), 'utf8'))
const ghUrl = pkg.homepage.replace(/#.*/, '').replace(/\/+$/, '')

const gitTarget =
  flags.tag ||
  childProcess.execSync('git rev-parse --short HEAD', {cwd: basePath, encoding: 'utf8'}).trim()

const doCommit = flags.commit
const slugRe = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g
const htmlDocsUrl = `https://sanity-io.github.io/asset-utils`

let docs: JSONOutput.ProjectReflection
let allNodes: Array<JSONOutput.DeclarationReflection>
let functions: Array<JSONOutput.DeclarationReflection>

const mdFilename = 'README.md'
const mdTemplate = fs.readFileSync(path.join(basePath, '_README.template.md'), 'utf8')
const mdBase = `<!-- This file is AUTO-GENERATED, edit _README.template.md or tweak scripts/generateReadme.ts -->\n${mdTemplate}`

generateHtmlDocs()
modifyHtmlDocs()
readJsonDocs()
extractFunctions()
rewriteTryFunctions()
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
    docs = JSON.parse(fs.readFileSync(path.resolve(basePath, 'docs', 'docs.json'), 'utf8'))
  } catch (err) {
    console.error(`Failed to read ${path.resolve(basePath, 'docs', 'docs.json')}:`, err)
    process.exit(1)
  }
}

function extractFunctions() {
  allNodes = docs.children || []
  functions = (docs.children || []).filter(
    (node) => node.variant === 'declaration' && node.kind === ReflectionKind.Function,
  )
}

function rewriteTryFunctions() {
  functions = functions.map((fn) => (fn.name.startsWith('try') ? rewriteTryFunction(fn) : fn))
}

function rewriteTryFunction(
  fn: JSONOutput.DeclarationReflection,
): JSONOutput.DeclarationReflection {
  const srcName = fn.name.replace(/^try/, '').replace(/^[A-Z]/, (char) => char.toLowerCase())
  const src = functions.find((node) => node.name === srcName)
  if (!src) {
    return fn
  }

  const fnSignatures = fn.signatures || []
  const srcSignatures = src.signatures || []

  const sigs = Math.min(srcSignatures.length, fnSignatures.length)
  for (let i = 0; i < sigs; i++) {
    const fnSig = fnSignatures[i]
    const srcSig = srcSignatures[i]
    if (!fnSig.comment?.summary.length) {
      fnSig.comment = {...fnSig.comment, summary: srcSig.comment?.summary || []}
    }
    if (fnSig.parameters?.length === 1 && fnSig.parameters[0].name === 'args') {
      fnSig.parameters = srcSig.parameters
    }
  }

  return fn
}

function slugify(str: string): string {
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
  const content = mdBase.trimStart().replace(/## License/, `${createMarkdownBody()}\n\n## License`)
  fs.writeFileSync(path.join(basePath, mdFilename), content)
}

function createMarkdownToc() {
  return outdent`
    ### Functions

    ${functions.map((child) => `- [${child.name}](#${slugify(child.name)})`).join('\n')}
  `
}

function createMarkdownBody() {
  const header = outdent`
  ## Documentation

  An [HTML version](https://sanity-io.github.io/asset-utils/) is also available, which also includes interface definitions, constants and more.
  `
  const toc = createMarkdownToc()
  const fns = functions.map((child) => createMarkdownFnDoc(child)).join('\n\n')
  return `${header}\n\n${toc}\n\n${fns}`
}

function createMarkdownParameterSignature(param: JSONOutput.ParameterReflection) {
  const type = formatMarkdownRef(param.type)
  const opt = param.flags?.isOptional ? '?' : ''
  return `${code(param.name)}${opt}: ${type}`
}

function sortUnionTypes(types: JSONOutput.SomeType[]) {
  const undefinedIndex = types.findIndex(
    (type) => type.type === 'intrinsic' && type.name === 'undefined',
  )
  if (undefinedIndex === -1) {
    return types
  }

  const sorted = types.slice()
  const [undef] = sorted.splice(undefinedIndex, 1)
  return sorted.concat(undef)
}

function getUrlForNode(node: JSONOutput.DeclarationReflection) {
  const isFunction = node.kind === ReflectionKind.Function
  if (isFunction) {
    return `${mdFilename}#${node.name}`
  }

  if (node.kind === ReflectionKind.Interface) {
    return `${htmlDocsUrl}/interfaces/${node.name}.html`
  }

  if (node.kind === ReflectionKind.TypeAlias) {
    return `${htmlDocsUrl}/types/${node.name}.html`
  }

  if (node.kind === ReflectionKind.Variable) {
    return `${htmlDocsUrl}/variables/${node.name}.html`
  }

  if (node.kind === ReflectionKind.Class) {
    return `${htmlDocsUrl}/classes/${node.name}.html`
  }

  return `${htmlDocsUrl}/index.html#${node.name}`
}

function formatMarkdownRef(thing: JSONOutput.ParameterReflection['type']): string {
  if (!thing) {
    return 'unknown'
  }

  const refNode =
    thing.type === 'reference' &&
    allNodes.find((node) => (thing.target ? node.id === thing.target : node.name === thing.name))

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

  if (thing.type === 'literal') {
    return JSON.stringify(thing.value, null, 2)
  }

  if (thing.type === 'tuple') {
    return `[${(thing.elements || []).map(formatMarkdownRef).join(', ')}]`
  }

  if (thing.type === 'namedTupleMember') {
    return `${thing.name}: ${formatMarkdownRef(thing.element)}`
  }

  if (thing.type === 'reflection') {
    return 'unknown'
  }

  throw new Error(`Unknown parameter type: ${JSON.stringify(thing, null, 2)}`)
}

function createMarkdownReturnValue(sig: JSONOutput.SignatureReflection) {
  const returnType = formatMarkdownRef(sig.type)
  return em(returnType)
}

function createMarkdownFnSignature(
  sig: JSONOutput.SignatureReflection,
  parent: JSONOutput.DeclarationReflection,
) {
  const params = sig.parameters || []
  const description = getTextComment(sig.comment) || getTextComment(parent.comment)
  const paramsTable = generateParamsTable(params)
  const returns = `${bold('Returns:')} ${createMarkdownReturnValue(sig)}`
  const signature = ['']
    .concat(`▸ ${bold(sig.name)}(`)
    .concat(params.map(createMarkdownParameterSignature).join(', '))
    .concat(`): ${createMarkdownReturnValue(sig)}`)
    .join('')

  return [signature].concat(description).concat(paramsTable).concat(returns).join('\n\n')
}

function getTextComment(comment: JSONOutput.Comment | undefined): string {
  if (!comment || !comment.summary) {
    return ''
  }

  return comment.summary
    .map((node) => {
      if (node.kind === 'text') {
        return node.text
      }
      if (node.kind === 'code') {
        return code(node.text)
      }
      if (node.kind === 'relative-link') {
        return relativeLink(node)
      }

      return node.text
    })
    .join(' ')
    .replace(/(?<!\n)\n(?!\n)/g, ' ')
    .trim()
}

function generateParamsTable(params: Array<JSONOutput.ParameterReflection>): string {
  const paramsHasDescription = params.some((param) =>
    param.comment?.summary.some((node) => node.kind === 'text' && node.text.trim().length > 0),
  )
  const headers = paramsHasDescription ? `| Name | Type | Description |` : '| Name | Type |'
  const separat = paramsHasDescription ? `| ---- | ---- | ----------- |` : '| ---- | ---- |'
  const rows = params.map((param) => {
    const type = formatMarkdownRef(param.type)
    const prefix = param.flags?.isOptional ? '(_Optional_) ' : ''
    const stub: string[] = prefix ? [prefix] : []
    const description = paramsHasDescription ? [prefix + getTextComment(param.comment)] : stub

    const parts = ['', code(param.name), type, ...description, ''].map((part) =>
      part.replace(/\|/g, '\\|'),
    )
    return parts.join(' | ').trim()
  })

  return rows.length > 0 ? [headers, separat, ...rows].join('\n') : ''
}

function createMarkdownFnDoc(fn: JSONOutput.DeclarationReflection) {
  return outdent`
  ### ${fn.name}

  ${(fn.signatures || []).map((sig) => createMarkdownFnSignature(sig, fn)).join('\n')}

  ${(fn.sources || []).map((src) => em(`Defined in ${srcLink(src)}`)).join('\n')}
  `
}

function code(str: string) {
  return `\`${str}\``
}

function em(str: string) {
  return `_${str}_`
}

function bold(str: string) {
  return `**${str}**`
}

function relativeLink(src: JSONOutput.RelativeLinkDisplayPart) {
  return src.text
}

function srcLink(src: JSONOutput.SourceReference) {
  return `[${src.fileName}:${src.line}](${srcUrl(src)})`
}

function srcUrl(src: JSONOutput.SourceReference) {
  return `${ghUrl}/blob/${gitTarget}/${src.fileName}#L${src.line}`
}

function prettify() {
  childProcess.spawnSync(path.join(basePath, 'node_modules', '.bin', 'prettier'), [
    '--write',
    path.join(basePath, 'README.md'),
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
  childProcess.spawnSync(path.join(basePath, 'node_modules', '.bin', 'typedoc'), {
    cwd: basePath,
    stdio: 'inherit',
  })
}

function modifyHtmlDocs() {
  const htmlPath = path.join(basePath, 'docs', 'index.html')
  const $ = cheerio.load(fs.readFileSync(htmlPath))

  // If encountering (broken) @link tags - throw
  $(':contains("@link")').each(function () {
    const html = $(this).html() || ''
    html.replace(/{@link (.*?)}/g, (_, target) => {
      throw new Error(`Found BROKEN @link reference to "${target}"`)
    })
  })

  fs.writeFileSync(htmlPath, $.html())
}
