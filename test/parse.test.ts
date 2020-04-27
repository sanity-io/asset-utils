import {parseAssetId, parseFileAssetId, parseImageAssetId, parseAssetFilename} from '../src/parse'

test('parseAssetId(): throws on invalid document id (generic getter)', () => {
  expect(() => parseAssetId('moop')).toThrowErrorMatchingInlineSnapshot(
    `"Invalid image/file asset ID: moop"`
  )
  expect(() => parseAssetId('image-hash-300x-200-png')).toThrowErrorMatchingInlineSnapshot(
    `"Invalid image/file asset ID: image-hash-300x-200-png"`
  )
  expect(() => parseAssetId('image-hash-fooxbar-png')).toThrowErrorMatchingInlineSnapshot(
    `"Invalid image/file asset ID: image-hash-fooxbar-png"`
  )
  expect(() => parseAssetId('image-hash-20x-png')).toThrowErrorMatchingInlineSnapshot(
    `"Invalid image/file asset ID: image-hash-20x-png"`
  )
})

test('parseImageAssetId(): throws on invalid document id (image getter)', () => {
  expect(() => parseImageAssetId('moop')).toThrowErrorMatchingInlineSnapshot(
    `"Malformed asset ID 'moop'. Expected an id like \\"image-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-2000x3000-jpg\\"."`
  )
  expect(() => parseImageAssetId('image-hash-300x-200-png')).toThrowErrorMatchingInlineSnapshot(
    `"Malformed asset ID 'image-hash-300x-200-png'. Expected an id like \\"image-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-2000x3000-jpg\\"."`
  )
  expect(() => parseImageAssetId('image-hash-fooxbar-png')).toThrowErrorMatchingInlineSnapshot(
    `"Malformed asset ID 'image-hash-fooxbar-png'. Expected an id like \\"image-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-2000x3000-jpg\\"."`
  )
  expect(() => parseImageAssetId('image-hash-20x-png')).toThrowErrorMatchingInlineSnapshot(
    `"Malformed asset ID 'image-hash-20x-png'. Expected an id like \\"image-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-2000x3000-jpg\\"."`
  )
})

test('parseFileAssetId(): throws on invalid document id (file getter)', () => {
  expect(() => parseFileAssetId('moop')).toThrowErrorMatchingInlineSnapshot(
    `"Malformed file asset ID 'moop'. Expected an id like \\"file-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-pdf\\""`
  )
  expect(() => parseFileAssetId('file-hash-300x-200-png')).toThrowErrorMatchingInlineSnapshot(
    `"Malformed file asset ID 'file-hash-300x-200-png'. Expected an id like \\"file-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-pdf\\""`
  )
})

test('parseAssetFilename(): throws on invalid asset filenames', () => {
  expect(() => parseAssetFilename('blatti')).toThrowErrorMatchingInlineSnapshot(
    `"Invalid image/file asset filename: blatti"`
  )
})

test('parseAssetFilename(): returns object of named image properties if image filename', () => {
  expect(parseAssetFilename('abc123-200x500.png')).toMatchInlineSnapshot(`
    Object {
      "assetId": "abc123",
      "extension": "png",
      "height": 500,
      "type": "image",
      "width": 200,
    }
  `)
})

test('parseAssetFilename(): returns object of named image properties if file filename', () => {
  expect(parseAssetFilename('f00baa.pdf')).toMatchInlineSnapshot(`
    Object {
      "assetId": "f00baa",
      "extension": "pdf",
      "type": "file",
    }
  `)
})
