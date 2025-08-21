import {expect, test} from 'vitest'

import {
  fileAssetType,
  imageAssetType,
  inProgressAssetAssetId,
  inProgressAssetExtension,
  inProgressAssetId,
} from '../src/constants.js'
import {parseFileAssetUrl, parseImageAssetUrl} from '../src/parse.js'
import {buildFilePath, buildFileUrl, buildImagePath, buildImageUrl} from '../src/paths.js'
import {
  getAssetDocumentId,
  getExtension,
  getFile,
  getIdFromString,
  getImage,
  getImageAsset,
  getImageDimensions,
  getProject,
  isAssetFilename,
  tryGetAssetDocumentId,
  tryGetExtension,
  tryGetIdFromString,
  tryGetImage,
  tryGetImageAsset,
  tryGetImageDimensions,
} from '../src/resolve.js'
import {SanityFileSource, SanityImageSource} from '../src/types.js'
import {
  customCrop,
  customHotspot,
  expectedAsset,
  expectedImage,
  expectedImageWithCustomBaseUrl,
  testProject,
  testProjectWithCustomBaseUrl,
} from './fixtures.js'

const imgId = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
const imgPath = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
const imgUrl = `https://cdn.sanity.io/${imgPath}`
const imgPathPretty = `${imgPath}/pretty.png`
const imgUrlPretty = `${imgUrl}/pretty.png`
const stagingImgUrl = `https://cdn.sanity.staging/${imgPath}`
const stagingImgUrlPretty = `${stagingImgUrl}/pretty.png`
const customCdnImgUrl = `https://cdn.autofoos.com/${imgPath}`
const customCdnImgUrlPretty = `${customCdnImgUrl}/pretty.png`
const validImgSources: [string, SanityImageSource][] = [
  ['asset id', imgId],
  ['reference', {_ref: imgId}],
  ['path stub', {path: imgPath}],
  ['url stub', {url: imgUrl}],
  ['staging url stub', {url: imgUrl}],
  ['object reference stub', {asset: {_ref: imgId}}],
  ['object id stub', {asset: {_id: imgId}}],
  ['object path stub', {asset: {path: imgPath}}],
  ['object url stub', {asset: {url: imgUrl}}],
  ['staging object url stub', {asset: {url: stagingImgUrl}}],
  ['custom cdn object url stub', {asset: {url: customCdnImgUrl}}],
  ['path stub (pretty filename)', {path: imgPathPretty}],
  ['url stub (pretty filename)', {url: imgUrlPretty}],
  ['staging url stub (pretty filename)', {url: stagingImgUrlPretty}],
  ['object path stub (pretty filename)', {asset: {path: imgPathPretty}}],
  ['object url stub (pretty filename)', {asset: {url: imgUrlPretty}}],
  ['staging object url stub (pretty filename)', {asset: {url: stagingImgUrlPretty}}],
  ['custom cdn object url stub (pretty filename)', {asset: {url: customCdnImgUrlPretty}}],
]

const imgLegacyId = 'image-LA5zSofUOP0i_iQwi4B2dEbzHQseitcuORm4n-600x578-png'
const imgLegacyPath = 'images/a/b/LA5zSofUOP0i_iQwi4B2dEbzHQseitcuORm4n-600x578.png'
const imgLegacyUrl = `https://cdn.sanity.io/${imgLegacyPath}`
const imgLegacyPathPretty = `${imgLegacyPath}/pretty.png`
const imgLegacyUrlPretty = `${imgLegacyUrl}/pretty.png`
const stagingImgLegacyUrl = `https://cdn.sanity.io/${imgLegacyPath}`
const stagingImgLegacyUrlPretty = `${stagingImgLegacyUrl}/pretty.png`
const customCdnImgLegacyUrl = `https://cdn.autofoos.com/${imgLegacyPath}`
const customCdnImgLegacyUrlPretty = `${customCdnImgLegacyUrl}/pretty.png`
const validLegacyImgSources: [string, SanityImageSource][] = [
  ['asset id', imgLegacyId],
  ['reference', {_ref: imgLegacyId}],
  ['path stub', {path: imgLegacyPath}],
  ['url stub', {url: imgLegacyUrl}],
  ['staging url stub', {url: stagingImgLegacyUrl}],
  ['object reference stub', {asset: {_ref: imgLegacyId}}],
  ['object id stub', {asset: {_id: imgLegacyId}}],
  ['object path stub', {asset: {path: imgLegacyPath}}],
  ['object url stub', {asset: {url: imgLegacyUrl}}],
  ['staging object url stub', {asset: {url: stagingImgLegacyUrl}}],
  ['custom cdn object url stub', {asset: {url: customCdnImgLegacyUrl}}],
  ['path stub (pretty filename)', {path: imgLegacyPathPretty}],
  ['url stub (pretty filename)', {url: imgLegacyUrlPretty}],
  ['staging url stub (pretty filename)', {url: stagingImgLegacyUrlPretty}],
  ['object path stub (pretty filename)', {asset: {path: imgLegacyPathPretty}}],
  ['object url stub (pretty filename)', {asset: {url: imgLegacyUrlPretty}}],
  ['staging object url stub (pretty filename)', {asset: {url: stagingImgLegacyUrlPretty}}],
  ['custom cdn object url stub (pretty filename)', {asset: {url: customCdnImgLegacyUrlPretty}}],
]

const fileId = 'file-def987abc12345678909877654321abcdef98765-pdf'
const filePath = 'files/a/b/def987abc12345678909877654321abcdef98765.pdf'
const fileUrl = `https://cdn.sanity.io/${filePath}`
const filePathPretty = `${filePath}/pretty.pdf`
const fileUrlPretty = `${fileUrl}/pretty.pdf`
const stagingFileUrl = `https://cdn.sanity.staging/${filePath}`
const stagingFileUrlPretty = `${stagingFileUrl}/pretty.pdf`
const customCdnFileUrl = `https://cdn.autofoos.com/${filePath}`
const customCdnFileUrlPretty = `${customCdnFileUrl}/pretty.pdf`
const validFileSources: [string, SanityFileSource][] = [
  ['asset id', fileId],
  ['reference', {_ref: fileId}],
  ['path stub', {path: filePath}],
  ['url stub', {url: fileUrl}],
  ['staging url stub', {url: stagingFileUrl}],
  ['object reference stub', {asset: {_ref: fileId}}],
  ['object id stub', {asset: {_id: fileId}}],
  ['object path stub', {asset: {path: filePath}}],
  ['object url stub', {asset: {url: fileUrl}}],
  ['staging object url stub', {asset: {url: stagingFileUrl}}],
  ['custom cdn object url stub', {asset: {url: customCdnFileUrl}}],
  ['path stub (pretty filename)', {path: filePathPretty}],
  ['url stub (pretty filename)', {url: fileUrlPretty}],
  ['staging url stub (pretty filename)', {url: stagingFileUrlPretty}],
  ['object path stub (pretty filename)', {asset: {path: filePathPretty}}],
  ['object url stub (pretty filename)', {asset: {url: fileUrlPretty}}],
  ['staging object url stub (pretty filename)', {asset: {url: stagingFileUrlPretty}}],
  ['custom cdn object url stub (pretty filename)', {asset: {url: customCdnFileUrlPretty}}],
]

// buildImagePath()
test('buildImagePath(): throws if no project id or dataset given', () => {
  expect(() =>
    buildImagePath({
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Project details (projectId and dataset) required to resolve path for image]`,
  )
})

test('buildImagePath(): builds image paths correctly', () => {
  const path = buildImagePath(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(path).toEqual('images/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png')
})

test('buildImagePath(): builds image path with vanity filename correctly', () => {
  const path = buildImagePath(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
      vanityFilename: 'so-pretty.png',
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(path).toEqual(
    'images/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png/so-pretty.png',
  )
})

// buildImageUrl()
test('buildImageUrl(): throws if no project id or dataset given', () => {
  expect(() =>
    buildImageUrl({
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Project details (projectId and dataset) required to resolve path for image]`,
  )
})

test('buildImageUrl(): builds image urls correctly', () => {
  const url = buildImageUrl(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(url).toEqual(
    'https://cdn.sanity.io/images/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png',
  )
})

test('buildImageUrl(): builds image urls correctly with project in asset', () => {
  const url = buildImageUrl({
    assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
    extension: 'png',
    metadata: {dimensions: {height: 300, width: 500}},
    projectId: 'abc123',
    dataset: 'foo',
  })

  expect(url).toEqual(
    'https://cdn.sanity.io/images/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png',
  )
})

test('buildImageUrl(): builds image urls correctly with parsed asset url', () => {
  const input =
    'https://cdn.sanity.io/images/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png/vanity.png'
  const output = buildImageUrl(parseImageAssetUrl(input))

  expect(input).toEqual(output)
})

test('buildImageUrl(): builds image urls correctly', () => {
  const url = buildImageUrl(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'png',
      metadata: {dimensions: {height: 300, width: 500}},
      originalFilename: 'pretty.png',
      vanityFilename: 'prettier.png',
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(url).toEqual(
    'https://cdn.sanity.io/images/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png/prettier.png',
  )
})

test('buildImageUrl(): uses custom baseUrl if specified', () => {
  const input =
    'https://cdn.sanity.io/images/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b-500x300.png/vanity.png'
  const output = buildImageUrl(parseImageAssetUrl(input), {baseUrl: 'https://cdn.mycompany.com'})

  expect(output).toEqual(input.replace('https://cdn.sanity.io', 'https://cdn.mycompany.com'))
})

// buildFilePath()
test('buildFilePath(): throws if no project id or dataset given', () => {
  expect(() =>
    buildFilePath({
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'pdf',
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Project details (projectId and dataset) required to resolve path for file]`,
  )
})

test('buildFilePath(): builds file paths correctly', () => {
  const path = buildFilePath(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'txt',
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(path).toEqual('files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.txt')
})

test('buildFilePath(): builds file paths correctly with project in asset', () => {
  const path = buildFilePath({
    assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
    extension: 'txt',
    projectId: 'abc123',
    dataset: 'foo',
  })

  expect(path).toEqual('files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.txt')
})

test('buildFilePath(): builds file path with vanity filename correctly', () => {
  const path = buildFilePath(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'mp4',
      vanityFilename: 'kokos-zoomies.mp4',
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(path).toEqual(
    'files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.mp4/kokos-zoomies.mp4',
  )
})

// buildFileUrl()
test('buildFileUrl(): throws if no project id or dataset given', () => {
  expect(() =>
    buildFileUrl({
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'mp4',
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Project details (projectId and dataset) required to resolve path for file]`,
  )
})

test('buildFileUrl(): builds file urls correctly', () => {
  const url = buildFileUrl(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'mov',
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(url).toEqual(
    'https://cdn.sanity.io/files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.mov',
  )
})

test('buildFileUrl(): builds file urls correctly with project in asset', () => {
  const url = buildFileUrl({
    assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
    extension: 'mov',
    projectId: 'abc123',
    dataset: 'foo',
  })

  expect(url).toEqual(
    'https://cdn.sanity.io/files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.mov',
  )
})

test('buildFileUrl(): builds file urls correctly with parsed asset url', () => {
  const input =
    'https://cdn.sanity.io/files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.mov/vanity.mov'
  const output = buildFileUrl(parseFileAssetUrl(input))

  expect(input).toEqual(output)
})

test('buildFileUrl(): uses custom baseUrl if specified', () => {
  const input =
    'https://cdn.sanity.io/files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.mov/vanity.mov'
  const output = buildFileUrl(parseFileAssetUrl(input), {baseUrl: 'https://cdn.mycompany.com'})

  expect(output).toEqual(input.replace('https://cdn.sanity.io', 'https://cdn.mycompany.com'))
})

test('buildFileUrl(): builds file urls correctly', () => {
  const url = buildFileUrl(
    {
      assetId: 'f00baaf00baaf00baaf00baaf00baaf00baaf00b',
      extension: 'mp3',
      originalFilename: 'episode-1.mp3',
      vanityFilename: 's01e01-the-one-with-assets.mp3',
    },
    {projectId: 'abc123', dataset: 'foo'},
  )

  expect(url).toEqual(
    'https://cdn.sanity.io/files/abc123/foo/f00baaf00baaf00baaf00baaf00baaf00baaf00b.mp3/s01e01-the-one-with-assets.mp3',
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

test('getIdFromString(): from URL (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with pretty filename (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with query', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with query (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with query + pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png?w=120&h=120'
  expect(getIdFromString(url)).toBe(id)
})

test('getIdFromString(): from URL with query + pretty filename (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png?w=120&h=120'
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

test('getAssetDocumentId(): from URL (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL (custom cdn)', () => {
  const id = 'image-9d884e501c64d640a321ca5700d32ac4250064ca-600x400-jpg'
  const url =
    'https://cdn.content.mydomain.com/images/foo/bar/9d884e501c64d640a321ca5700d32ac4250064ca-600x400.jpg'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with pretty filename (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with query', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with query (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with query and pretty filename', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png?w=120&h=120'
  expect(getAssetDocumentId(url)).toBe(id)
})

test('getAssetDocumentId(): from URL with query and pretty filename (staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/pretty.png?w=120&h=120'
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

test('getAssetDocumentId(): from asset stub (url, stagin)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url with query)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url with query, staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url + pretty filename)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url + pretty filename, staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url with query + pretty filename)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getAssetDocumentId({url})).toBe(id)
})

test('getAssetDocumentId(): from asset stub (url with query + pretty filename, staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
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

test('getAssetDocumentId(): from deep asset stub (url, staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getAssetDocumentId({asset: {url}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (url with query)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getAssetDocumentId({asset: {url}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (url with query, staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getAssetDocumentId({asset: {url}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (url with query + prettier filename)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=200'
  expect(getAssetDocumentId({asset: {url}})).toBe(id)
})

test('getAssetDocumentId(): from deep asset stub (url with query + prettier filename, staging)', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=200'
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

test('tryGetAssetDocumentId(): match, staging', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
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

test('getImageAsset(): from URL (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL, inferred project (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query, inferred project (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with pretty filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with pretty filename (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query + prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/foo.png?w=120&h=120'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query + prettier filename (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/foo.png?w=120&h=120'
  expect(getImageAsset(url, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL, inferred project + prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL, inferred project + prettier filename (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query + prettier filename, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getImageAsset(url)).toEqual(expectedAsset)
})

test('getImageAsset(): from URL with query + prettier filename, inferred project (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
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

test('getImageAsset(): from asset stub (url, staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({url}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({url})).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url), inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({url})).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset({url}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url with query), staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset({url}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url with query), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset({url})).toEqual(expectedAsset)
})

test('getImageAsset(): from asset stub (url with query), inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImageAsset({url})).toEqual(expectedAsset)
})

test('getImageAsset(): from full asset document', () => {
  const inferFrom = {...expectedAsset, originalFilename: 'mootools.png'}
  expect(getImageAsset(inferFrom)).toEqual(inferFrom)
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

test('getImageAsset(): from deep asset stub (url, staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({asset: {url}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url), inferred project (staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImageAsset({asset: {url}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url with query, staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImageAsset({asset: {url}}, testProject)).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url with query), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('getImageAsset(): from deep asset stub (url with query), inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
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

test('tryGetImageAsset(): match, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(tryGetImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('tryGetImageAsset(): match (pretty filename)', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=200'
  expect(tryGetImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('tryGetImageAsset(): match (pretty filename), staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=200'
  expect(tryGetImageAsset({asset: {url}})).toEqual(expectedAsset)
})

test('getImageAsset(): requires projectId/dataset on just ID', () => {
  expect(() =>
    getImageAsset('image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to resolve project ID and dataset from source]`,
  )
})

test('getImageAsset(): requires projectId/dataset on invalid path', () => {
  expect(() =>
    getImageAsset({
      _id: 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png',
      path: '',
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to resolve project ID and dataset from source]`,
  )
})

// getImage()
test('getImage(): from ID', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImage(id, testProject)).toEqual(expectedImage)
})

test('getImage(): from ID, with custom base url', () => {
  const id = 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'
  expect(getImage(id, testProjectWithCustomBaseUrl)).toEqual(expectedImageWithCustomBaseUrl)
})

test('getImage(): from URL', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL, override base url', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(url, testProjectWithCustomBaseUrl)).toEqual(expectedImageWithCustomBaseUrl)
})

test('getImage(): from URL with prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with prettier filename, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with prettier filename, staging, custom base url', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImage(url, testProjectWithCustomBaseUrl)).toEqual(expectedImageWithCustomBaseUrl)
})

test('getImage(): from URL with query', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with query, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with query, staging, with custom base url', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url, testProjectWithCustomBaseUrl)).toEqual(expectedImageWithCustomBaseUrl)
})

test('getImage(): from URL with query + prettier filename', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with query + prettier filename, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getImage(url, testProject)).toEqual(expectedImage)
})

test('getImage(): from URL with query + prettier filename, staging, with custom base url', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png?w=120&h=120'
  expect(getImage(url, testProjectWithCustomBaseUrl)).toEqual(expectedImageWithCustomBaseUrl)
})

test('getImage(): from URL, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL, inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL + prettier filename, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL + prettier filename, inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png/prettier.png'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL with query, inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL with query, inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url)).toEqual(expectedImage)
})

test('getImage(): from URL with query, override project/dataset', () => {
  const url =
    'https://cdn.sanity.io/images/c/d/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage(url, {projectId: 'a', dataset: 'b'})).toEqual(expectedImage)
})

test('getImage(): from path', () => {
  const path = 'images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(path, testProject)).toEqual(expectedImage)
})

test('getImage(): from path, inferred project', () => {
  const path = 'images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(path)).toEqual(expectedImage)
})

test('getImage(): from path, override project ID/dataset', () => {
  const path = 'images/c/d/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage(path, {projectId: 'a', dataset: 'b'})).toEqual(expectedImage)
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

test('getImage(): from asset stub (url, staging)', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({url}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (url), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({url})).toEqual(expectedImage)
})

test('getImage(): from asset stub (url,), inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({url})).toEqual(expectedImage)
})

test('getImage(): from asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage({url}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (url with query), staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage({url}, testProject)).toEqual(expectedImage)
})

test('getImage(): from asset stub (url with query), inferred project', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
  expect(getImage({url})).toEqual(expectedImage)
})

test('getImage(): from asset stub (url with query), inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=120&h=120'
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

test('getImage(): from deep asset stub (url), staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
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

test('getImage(): from deep asset stub (url), custom crop/hotspot, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
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

test('getImage(): from deep asset stub (url), inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  expect(getImage({asset: {url}})).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (url), inferred project, custom crop/hotspot', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {url}, ...custom})).toEqual({...expectedImage, ...custom})
})

test('getImage(): from deep asset stub (url), inferred project, custom crop/hotspot, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {url}, ...custom})).toEqual({...expectedImage, ...custom})
})

test('getImage(): from deep asset stub (url with query)', () => {
  const url =
    'https://cdn.sanity.io/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImage({asset: {url}}, testProject)).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (url with query), staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
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

test('getImage(): from deep asset stub (url with query), custom crop/hotspot, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/foo/bar/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
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

test('getImage(): from deep asset stub (url with query), inferred project, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(getImage({asset: {url}})).toEqual(expectedImage)
})

test('getImage(): from deep asset stub (url with query), inferred project, custom crop/hotspot', () => {
  const url =
    'https://cdn.sanity.io/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  const custom = {crop: customCrop, hotspot: customHotspot}
  expect(getImage({asset: {url}, ...custom})).toEqual({...expectedImage, ...custom})
})

test('getImage(): from deep asset stub (url with query), inferred project, custom crop/hotspot, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
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

test('tryGetImage(): match, staging', () => {
  const url =
    'https://cdn.sanity.staging/images/a/b/f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240.png?w=200'
  expect(tryGetImage(url)).toEqual(expectedImage)
})

test('getImage(): requires projectId/dataset on just ID', () => {
  expect(() =>
    getImage('image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png'),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to resolve project ID and dataset from source]`,
  )
})

test('getImage(): requires projectId/dataset on invalid path', () => {
  expect(() =>
    getImage({
      _id: 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-320x240-png',
      path: '',
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to resolve project ID and dataset from source]`,
  )
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
    `[Error: Failed to resolve asset ID from source]`,
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
  },
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
    `[Error: Failed to resolve asset ID from source]`,
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
    getProject({_ref: 'image-f00baaf00baaf00baaf00baaf00baaf00baaf00b-200x300-png'}),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to resolve project ID and dataset from source]`,
  )
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

// In-progress upload tests
const inProgressImageUpload = {_upload: {progress: 50}}
const inProgressFileUpload = {_upload: {progress: 75}}
const completedImageWithUpload = {asset: {_ref: imgId}, _upload: {progress: 100}}

test('getAssetDocumentId(): works for valid sources', () => {
  expect(getAssetDocumentId(imgId)).toBe(imgId)
  expect(getAssetDocumentId({_ref: imgId})).toBe(imgId)
  expect(getAssetDocumentId({asset: {_ref: imgId}})).toBe(imgId)
})

// getImage tests for in-progress uploads
test('getImage(): returns placeholder for in-progress image uploads', () => {
  const result = getImage(inProgressImageUpload)

  expect(result.asset._id).toBe(inProgressAssetId)
  expect(result.asset._type).toBe(imageAssetType)
  expect(result.asset.assetId).toBe(inProgressAssetAssetId)
  expect(result.asset.extension).toBe(inProgressAssetExtension)
  expect(result.asset.url).toBe('')
  expect(result.asset.path).toBe('')
  expect(result.asset.metadata.dimensions).toEqual({width: 1, height: 1, aspectRatio: 1})
  expect(result.crop).toEqual({left: 0, top: 0, right: 0, bottom: 0})
  expect(result.hotspot).toEqual({x: 0.5, y: 0.5, width: 1, height: 1})
})

test('getImage(): works for valid image sources', () => {
  const result = getImage(imgId, testProject)
  expect(result.asset._id).toBe(imgId)
  expect(result.asset._type).toBe('sanity.imageAsset')
})

test('getImage(): works for completed uploads with both asset and upload', () => {
  const result = getImage(completedImageWithUpload, testProject)
  expect(result.asset._id).toBe(imgId)
})

// getFile tests for in-progress uploads
test('getFile(): returns placeholder for in-progress file uploads', () => {
  const result = getFile(inProgressFileUpload)

  expect(result.asset._id).toBe(inProgressAssetId)
  expect(result.asset._type).toBe(fileAssetType)
  expect(result.asset.assetId).toBe(inProgressAssetAssetId)
  expect(result.asset.extension).toBe(inProgressAssetExtension)
  expect(result.asset.url).toBe('')
  expect(result.asset.path).toBe('')
  expect(result.asset.metadata).toEqual({})
})

test('getFile(): works for valid file sources', () => {
  const result = getFile(fileId, testProject)
  expect(result.asset._id).toBe(fileId)
  expect(result.asset._type).toBe('sanity.fileAsset')
})

// getAssetDocumentId tests for in-progress uploads
test('getAssetDocumentId(): returns placeholder for in-progress uploads', () => {
  expect(getAssetDocumentId(inProgressImageUpload)).toBe(inProgressAssetId)
  expect(getAssetDocumentId(inProgressFileUpload)).toBe(inProgressAssetId)
})

test('getAssetDocumentId(): works for completed uploads with both asset and upload', () => {
  expect(getAssetDocumentId(completedImageWithUpload)).toBe(imgId)
})

// tryGetAssetDocumentId tests for in-progress uploads
test('tryGetAssetDocumentId(): returns placeholder for in-progress uploads', () => {
  expect(tryGetAssetDocumentId(inProgressImageUpload)).toBe(inProgressAssetId)
  expect(tryGetAssetDocumentId(inProgressFileUpload)).toBe(inProgressAssetId)
})

test('tryGetAssetDocumentId(): works for completed uploads with both asset and upload', () => {
  expect(tryGetAssetDocumentId(completedImageWithUpload)).toBe(imgId)
})

// getImageDimensions tests for in-progress uploads
test('getImageDimensions(): returns placeholder dimensions for in-progress uploads', () => {
  const result = getImageDimensions(inProgressImageUpload)
  expect(result).toEqual({width: 1, height: 1, aspectRatio: 1})
})

test('getImageDimensions(): works for valid image sources', () => {
  const result = getImageDimensions(imgId)
  expect(result).toEqual({width: 320, height: 240, aspectRatio: 320 / 240})
})

// getExtension tests for in-progress uploads
test('getExtension(): returns placeholder extension for in-progress image uploads', () => {
  const result = getExtension(inProgressImageUpload)
  expect(result).toBe(inProgressAssetExtension)
})

test('getExtension(): returns placeholder extension for in-progress file uploads', () => {
  const result = getExtension(inProgressFileUpload)
  expect(result).toBe(inProgressAssetExtension)
})

test('getExtension(): works for valid image sources', () => {
  const result = getExtension(imgId)
  expect(result).toBe('png')
})

test('getExtension(): works for valid file sources', () => {
  const result = getExtension(fileId)
  expect(result).toBe('pdf')
})
