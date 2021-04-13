import {
  getIdFromString,
  tryGetIdFromString,
  getImage,
  tryGetImage,
  getImageAsset,
  tryGetImageAsset,
  getAssetDocumentId,
  tryGetAssetDocumentId,
  getImageDimensions,
  tryGetImageDimensions,
  getExtension,
  tryGetExtension,
  getProject,
  isAssetFilename,
} from '../src/resolve'
import {expectedAsset, testProject, customCrop, customHotspot, expectedImage} from './fixtures'
import {SanityImageSource, SanityFileSource} from '../src/types'
import {buildImagePath, buildImageUrl} from '../src/paths'

const imgId = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
const imgPath = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
const imgUrl = `https://cdn.sanity.io/${imgPath}`
const imgPathPretty = `${imgPath}/pretty.png`
const imgUrlPretty = `${imgUrl}/pretty.png`
const validImgSources: [string, SanityImageSource][] = [
  ['asset id', imgId],
  ['reference', {_ref: imgId}],
  ['path stub', {path: imgPath}],
  ['url stub', {url: imgUrl}],
  ['object reference stub', {asset: {_ref: imgId}}],
  ['object id stub', {asset: {_id: imgId}}],
  ['object path stub', {asset: {path: imgPath}}],
  ['object url stub', {asset: {url: imgUrl}}],
  ['path stub (pretty filename)', {path: imgPathPretty}],
  ['url stub (pretty filename)', {url: imgUrlPretty}],
  ['object path stub (pretty filename)', {asset: {path: imgPathPretty}}],
  ['object url stub (pretty filename)', {asset: {url: imgUrlPretty}}],
]

const imgLegacyId = 'image-LA5zSofUOP0i_iQwi4B2dEbzHQseitcuORm4n-600x578-png'
const imgLegacyPath = 'images/a/b/LA5zSofUOP0i_iQwi4B2dEbzHQseitcuORm4n-600x578.png'
const imgLegacyUrl = `https://cdn.sanity.io/${imgLegacyPath}`
const imgLegacyPathPretty = `${imgLegacyPath}/pretty.png`
const imgLegacyUrlPretty = `${imgLegacyUrl}/pretty.png`
const validLegacyImgSources: [string, SanityImageSource][] = [
  ['asset id', imgLegacyId],
  ['reference', {_ref: imgLegacyId}],
  ['path stub', {path: imgLegacyPath}],
  ['url stub', {url: imgLegacyUrl}],
  ['object reference stub', {asset: {_ref: imgLegacyId}}],
  ['object id stub', {asset: {_id: imgLegacyId}}],
  ['object path stub', {asset: {path: imgLegacyPath}}],
  ['object url stub', {asset: {url: imgLegacyUrl}}],
  ['path stub (pretty filename)', {path: imgLegacyPathPretty}],
  ['url stub (pretty filename)', {url: imgLegacyUrlPretty}],
  ['object path stub (pretty filename)', {asset: {path: imgLegacyPathPretty}}],
  ['object url stub (pretty filename)', {asset: {url: imgLegacyUrlPretty}}],
]

const fileId = 'file-def987-pdf'
const filePath = 'files/a/b/def987.pdf'
const fileUrl = `https://cdn.sanity.io/${filePath}`
const filePathPretty = `${filePath}/pretty.pdf`
const fileUrlPretty = `${fileUrl}/pretty.pdf`
const validFileSources: [string, SanityFileSource][] = [
  ['asset id', fileId],
  ['reference', {_ref: fileId}],
  ['path stub', {path: filePath}],
  ['url stub', {url: fileUrl}],
  ['object reference stub', {asset: {_ref: fileId}}],
  ['object id stub', {asset: {_id: fileId}}],
  ['object path stub', {asset: {path: filePath}}],
  ['object url stub', {asset: {url: fileUrl}}],
  ['path stub (pretty filename)', {path: filePathPretty}],
  ['url stub (pretty filename)', {url: fileUrlPretty}],
  ['object path stub (pretty filename)', {asset: {path: filePathPretty}}],
  ['object url stub (pretty filename)', {asset: {url: fileUrlPretty}}],
]

// buildImagePath()
test('buildImagePath(): throws if no project id or dataset given', () => {
  expect(() =>
    buildImagePath({
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Project details (projectId and dataset) required to resolve path for image"`
  )
})

test('buildImagePath(): builds image paths correctly', () => {
  const path = buildImagePath(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    },
    {projectId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b', dataset: 'foo'}
  )

  expect(path).toEqual(
    'images/f00baaf00baaf00baaf00baaf00baaf00baaf00b/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png'
  )
})

// buildImageUrl()
test('buildImageUrl(): throws if no project id or dataset given', () => {
  expect(() =>
    buildImageUrl({
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Project details (projectId and dataset) required to resolve path for image"`
  )
})

test('buildImageUrl(): builds image urls correctly', () => {
  const url = buildImageUrl(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    },
    {projectId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b', dataset: 'foo'}
  )

  expect(url).toEqual(
    'https://cdn.sanity.io/images/f00baaf00baaf00baaf00baaf00baaf00baaf00b/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png'
  )
})

// getIdFromString()
test('getIdFromString(): already an id', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getIdFromString(id)).toBe(id)
})

test('getIdFromString(): from URL', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with query', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with query + pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png?w=120&h=120'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from path', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getIdFromString(path)).toBe(id)
})

test('getIdFromString(): from filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const path = 'f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getIdFromString(path)).toBe(id)
})

test('getIdFromString(): no match', () => {
  expect(() => getIdFromString('who knows')).toThrow(/failed to resolve asset id/i)
})

test('tryGetIdFromString(): no match', () => {
  expect(tryGetIdFromString('who knows')).toBe(undefined)
})

test('tryGetIdFromString(): match', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const path = 'f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(tryGetIdFromString(path)).toBe(id)
})

// getAssetDocumentId()
test('getAssetDocumentId(): already an id', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getAssetDocumentId(id)).toBe(id)
})

test('getAssetDocumentId(): from URL', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with query', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with query and pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png?w=120&h=120'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from path', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId(path)).toBe(id)
})

test('getAssetDocumentId(): from image filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const path = 'f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId(path)).toBe(id)
})

test('getAssetDocumentId(): from filename', () => {
  const id = 'file-f00baaf00baaf00baaf00baaf00baaf00baaf00b-pdf'
  const path = 'f00baaf00baaf00baaf00baaf00baaf00baaf00b.pdf'
  expect(getAssetDocumentId(path)).toBe(id)
})

test('getAssetDocumentId(): from reference', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getAssetDocumentId({_ref: id})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (id)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getAssetDocumentId({_id: id})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (path)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId({path})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url with query)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url + pretty filename)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url with query + pretty filename)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from deep reference', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getAssetDocumentId({asset: {_ref: id}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (id)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getAssetDocumentId({asset: {_id: id}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (path)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId({asset: {path}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (url)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId({asset: {url}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (url with query)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getAssetDocumentId({asset: {url}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (url with query + prettier filename)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=200'
  expect(getAssetDocumentId({asset: {url}})).toBe(id)
})

test('getAssetDocumentId(): no match', () => {
  expect(() => getAssetDocumentId('who knows')).toThrow(/failed to resolve asset id/i)
})

test('tryGetAssetDocumentId(): no match', () => {
  expect(tryGetAssetDocumentId('who knows')).toBe(undefined)
})

test('tryGetAssetDocumentId(): match', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(tryGetAssetDocumentId({asset: {url}})).toBe(id)
})

// getImageAsset()
test('getImageAsset(): from ID', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImageAsset(id, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with pretty filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query + prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/foo.png?w=120&h=120'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL, inferred project + prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query + prettier filename, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from path', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(path, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from path, inferred project', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(path)).toEqual(expectedAsset)
})

test('getImageAsset(): from filename', () => {
  const path = 'f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(path, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from reference', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImageAsset({_ref: id}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (id)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImageAsset({_id: id}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (path)', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({path}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (path), inferred project', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({path})).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({url}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({url})).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset({url}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url with query), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset({url})).toEqual(expectedAsset)
})

test('getImageAsset(): from deep reference', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImageAsset({asset: {_ref: id}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (id)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImageAsset({asset: {_id: id}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (path)', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({asset: {path}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (path), inferred project', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({asset: {path}})).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({asset: {url}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImageAsset({asset: {url}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url with query), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('getImageAsset(): no match', () => {
  expect(() => getImageAsset('ey hold up')).toThrow(/failed to resolve/i)
})

test('tryGetImageAsset(): no match', () => {
  expect(tryGetImageAsset('ey hold up')).toBe(undefined)
})

test('tryGetImageAsset(): match', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(tryGetImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('tryGetImageAsset(): match (pretty filename)', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=200'
  expect(tryGetImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('getImageAsset(): requires projectId/dataset on just ID', () => {
  expect(() =>
    getImageAsset('image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png')
  ).toThrowErrorMatchingInlineSnapshot(`"Failed to resolve project ID and dataset from source"`)
})

test('getImageAsset(): requires projectId/dataset on invalid path', () => {
  expect(() =>
    getImageAsset({
      _id: 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png',
      path: '',
    })
  ).toThrowErrorMatchingInlineSnapshot(`"Failed to resolve project ID and dataset from source"`)
})

// getImage()
test('getImage(): from ID', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImage(id, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with query', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with query + prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL + prettier filename, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL with query, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from path', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(path, testProject)).toEqual(expectedImage)
})

test('getImage(): from path, inferred project', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(path)).toEqual(expectedImage)
})

test('getImage(): from filename', () => {
  const path = 'f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(path, testProject)).toEqual(expectedImage)
})

test('getImage(): from reference', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImage({_ref: id}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (id)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImage({_id: id}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (path)', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({path}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (path), inferred project', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({path})).toEqual(expectedImage)
})

test('getImage(): from asset stub (url)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({url}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (url), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({url})).toEqual(expectedImage)
})

test('getImage(): from asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage({url}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (url with query), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage({url})).toEqual(expectedImage)
})

test('getImage(): from deep reference', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImage({asset: {_ref: id}}, testProject)).toEqual(expectedImage)
})

test('getImage(): from deep reference, custom crop/hotspot', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {_ref: id}, ...custom}, testProject)).toEqual({
    ...expectedImage,
    ...custom,
  })
})

test('getImage(): from deep asset stub (id)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImage({asset: {_id: id}}, testProject)).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (id), custom crop/hotspot', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {_id: id}, ...custom}, testProject)).toEqual({
    ...expectedImage,
    ...custom,
  })
})

test('getImage(): from deep asset stub (path)', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({asset: {path}}, testProject)).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (path), custom crop/hotspot', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {path}, ...custom}, testProject)).toEqual({
    ...expectedImage,
    ...custom,
  })
})

test('getImage(): from deep asset stub (path), inferred project', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({asset: {path}})).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (path), inferred project, custom crop/hotspot', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {path}, ...custom})).toEqual({...expectedImage, ...custom})
})

test('getImage(): from deep asset stub (url)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({asset: {url}}, testProject)).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (url), custom crop/hotspot', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {url}, ...custom}, testProject)).toEqual({
    ...expectedImage,
    ...custom,
  })
})

test('getImage(): from deep asset stub (url), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({asset: {url}})).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (url), inferred project, custom crop/hotspot', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {url}, ...custom})).toEqual({...expectedImage, ...custom})
})

test('getImage(): from deep asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImage({asset: {url}}, testProject)).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (url with query), custom crop/hotspot', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {url}, ...custom}, testProject)).toEqual({
    ...expectedImage,
    ...custom,
  })
})

test('getImage(): from deep asset stub (url with query), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImage({asset: {url}})).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (url with query), inferred project, custom crop/hotspot', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {url}, ...custom})).toEqual({...expectedImage, ...custom})
})

test('getImage(): no match', () => {
  expect(() => getImage('ey hold up')).toThrow(/failed to resolve/i)
})

test('tryGetImage(): no match', () => {
  expect(tryGetImage('ey hold up')).toBe(undefined)
})

test('tryGetImage(): match', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(tryGetImage(url)).toEqual(expectedImage)
})

test('getImage(): requires projectId/dataset on just ID', () => {
  expect(() =>
    getImage('image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png')
  ).toThrowErrorMatchingInlineSnapshot(`"Failed to resolve project ID and dataset from source"`)
})

test('getImage(): requires projectId/dataset on invalid path', () => {
  expect(() =>
    getImage({
      _id: 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png',
      path: '',
    })
  ).toThrowErrorMatchingInlineSnapshot(`"Failed to resolve project ID and dataset from source"`)
})

// getImageDimensions()
test.each(validImgSources)('getImageDimensions() can resolve from %s', (_, source) => {
  expect(getImageDimensions(source)).toEqual({width: 320, height: 240, aspectRatio: 320 / 240})
})

test.each(validLegacyImgSources)('getImageDimensions() can resolve from legacy %s', (_, source) => {
  expect(getImageDimensions(source)).toEqual({width: 600, height: 578, aspectRatio: 600 / 578})
})

test('getImageDimensions(): throws on invalid source', () => {
  expect(() => getImageDimensions('whatever')).toThrowErrorMatchingInlineSnapshot(
    `"Failed to resolve asset ID from source"`
  )
})

test('tryGetImageDimensions(): returns undefined on invalid source', () => {
  expect(tryGetImageDimensions('whatever')).toBe(undefined)
})

test.each(validImgSources)('tryGetImageDimensions() can resolve from %s', (_, source) => {
  expect(tryGetImageDimensions(source)).toEqual({width: 320, height: 240, aspectRatio: 320 / 240})
})

test.each(validLegacyImgSources)(
  'tryGetImageDimensions() can resolve from legacy %s',
  (_, source) => {
    expect(tryGetImageDimensions(source)).toEqual({width: 600, height: 578, aspectRatio: 600 / 578})
  }
)

// getExtension()
test.each(validImgSources)('getExtension() can resolve from image %s', (_, source) => {
  expect(getExtension(source)).toEqual('png')
})

test.each(validLegacyImgSources)('getExtension() can resolve from legacy %s', (_, source) => {
  expect(getExtension(source)).toEqual('png')
})

test.each(validFileSources)('getExtension() can resolve from file %s', (_, source) => {
  expect(getExtension(source)).toEqual('pdf')
})

test('getExtension(): throws on invalid source', () => {
  expect(() => getExtension('whatever')).toThrowErrorMatchingInlineSnapshot(
    `"Failed to resolve asset ID from source"`
  )
})

test('tryGetExtension(): returns undefined on invalid source', () => {
  expect(tryGetExtension('whatever')).toBe(undefined)
})

test.each(validImgSources)('tryGetExtension() can resolve from image %s', (_, source) => {
  expect(getExtension(source)).toEqual('png')
})

test.each(validFileSources)('tryGetExtension() can resolve from file %s', (_, source) => {
  expect(getExtension(source)).toEqual('pdf')
})

// getProject()
test('getProject(): throws if passing a reference', () => {
  expect(() =>
    getProject({_ref: 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-200x300-png'})
  ).toThrowErrorMatchingInlineSnapshot(`"Failed to resolve project ID and dataset from source"`)
})

// isAssetFilename()
test('isAssetFilename(): returns true for image filenames', () => {
  expect(isAssetFilename('f00baaf00baaf00baaf00baaf00baaf00baaf00b-200x300.png')).toBe(true)
})

test('isAssetFilename(): returns true for file filenames', () => {
  expect(isAssetFilename('f00baaf00baaf00baaf00baaf00baaf00baaf00b.mp4')).toBe(true)
})

test('isAssetFilename(): returns false for invalid filenames', () => {
  expect(isAssetFilename('foobar-lol.rottifnatti')).toBe(false)
})
