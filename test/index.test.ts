import {expect, test} from 'vitest'

import * as exported from '../src/index.js'

test('index: provides all exports', () => {
  expect(Object.keys(exported).sort()).toEqual(
    [
      'DEFAULT_CROP',
      'DEFAULT_HOTSPOT',
      'UnresolvableError',
      'buildFilePath',
      'buildFileUrl',
      'buildImagePath',
      'buildImageUrl',
      'getAssetDocumentId',
      'getAssetUrlType',
      'getDefaultCrop',
      'getDefaultHotspot',
      'getExtension',
      'getFile',
      'getFileAsset',
      'getIdFromString',
      'getImage',
      'getImageAsset',
      'getImageDimensions',
      'getProject',
      'getUrlFilename',
      'getUrlPath',
      'getVanityStub',
      'isAssetFilename',
      'isAssetId',
      'isAssetIdStub',
      'isAssetObjectStub',
      'isAssetPathStub',
      'isAssetUrlStub',
      'isDefaultCrop',
      'isDefaultHotspot',
      'isFileAssetFilename',
      'isFileAssetId',
      'isFileSource',
      'isImageAssetFilename',
      'isImageAssetId',
      'isImageSource',
      'isReference',
      'isSanityAssetUrl',
      'isSanityFileAsset',
      'isSanityFileUrl',
      'isSanityImageAsset',
      'isSanityImageUrl',
      'isUnresolvableError',
      'isValidFilename',
      'parseAssetFilename',
      'parseAssetId',
      'parseAssetUrl',
      'parseFileAssetId',
      'parseFileAssetUrl',
      'parseImageAssetId',
      'parseImageAssetUrl',
      'tryGetAssetDocumentId',
      'tryGetAssetPath',
      'tryGetExtension',
      'tryGetFile',
      'tryGetFileAsset',
      'tryGetIdFromString',
      'tryGetImage',
      'tryGetImageAsset',
      'tryGetImageDimensions',
      'tryGetProject',
      'tryGetUrlFilename',
      'tryGetUrlPath',
    ].sort(),
  )
})
