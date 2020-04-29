<!-- This file is AUTO-GENERATED, edit README.template.md or tweak scripts/generateReadme.js -->

# @sanity/asset-utils

Reusable utility functions for dealing with image and file assets in Sanity

## Installing

```sh
$ npm install @sanity/asset-utils
```

## Usage

```js
// ESM / TypeScript
import {someUtilityFunction} from '@sanity/asset-utils'

// CommonJS
const {someUtilityFunction} = require('@sanity/asset-utils')
```

## Documentation

An [HTML version](https://sanity-io.github.io/asset-utils/) is also available, which also includes interface definitions, constants and more.### Functions

- [buildFilePath](README.md#buildfilepath)
- [buildFileUrl](README.md#buildfileurl)
- [buildImagePath](README.md#buildimagepath)
- [buildImageUrl](README.md#buildimageurl)
- [getAssetDocumentId](README.md#getassetdocumentid)
- [tryGetAssetDocumentId](README.md#trygetassetdocumentid)
- [tryGetAssetPath](README.md#trygetassetpath)
- [getDefaultCrop](README.md#getdefaultcrop)
- [getDefaultHotspot](README.md#getdefaulthotspot)
- [getExtension](README.md#getextension)
- [tryGetExtension](README.md#trygetextension)
- [getFile](README.md#getfile)
- [tryGetFile](README.md#trygetfile)
- [getFileAsset](README.md#getfileasset)
- [tryGetFileAsset](README.md#trygetfileasset)
- [getIdFromString](README.md#getidfromstring)
- [tryGetIdFromString](README.md#trygetidfromstring)
- [getImage](README.md#getimage)
- [tryGetImage](README.md#trygetimage)
- [getImageAsset](README.md#getimageasset)
- [tryGetImageAsset](README.md#trygetimageasset)
- [getImageDimensions](README.md#getimagedimensions)
- [tryGetImageDimensions](README.md#trygetimagedimensions)
- [getProject](README.md#getproject)
- [tryGetProject](README.md#trygetproject)
- [getUrlFilename](README.md#geturlfilename)
- [tryGetUrlFilename](README.md#trygeturlfilename)
- [getUrlPath](README.md#geturlpath)
- [tryGetUrlPath](README.md#trygeturlpath)
- [hasPath](README.md#haspath)
- [idFromUrl](README.md#idfromurl)
- [isAssetFilename](README.md#isassetfilename)
- [isAssetIdStub](README.md#isassetidstub)
- [isAssetObjectStub](README.md#isassetobjectstub)
- [isAssetPathStub](README.md#isassetpathstub)
- [isAssetUrlStub](README.md#isasseturlstub)
- [isFileAssetFilename](README.md#isfileassetfilename)
- [isFileSource](README.md#isfilesource)
- [isImageAssetFilename](README.md#isimageassetfilename)
- [isImageSource](README.md#isimagesource)
- [isReference](README.md#isreference)
- [isSanityFileAsset](README.md#issanityfileasset)
- [isUnresolvableError](README.md#isunresolvableerror)
- [isValidFilename](README.md#isvalidfilename)
- [parseAssetFilename](README.md#parseassetfilename)
- [parseAssetId](README.md#parseassetid)
- [parseFileAssetId](README.md#parsefileassetid)
- [parseImageAssetId](README.md#parseimageassetid)

### buildFilePath

▸ **buildFilePath**(`asset`: [FileUrlBuilderOptions](README.md#fileurlbuilderoptions), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _string_

Builds the base file path from the minimal set of parts required to assemble it

| Name      | Type                                                     | Description                                               |
| --------- | -------------------------------------------------------- | --------------------------------------------------------- |
| `asset`   | [FileUrlBuilderOptions](README.md#fileurlbuilderoptions) | An asset-like shape defining ID, dimensions and extension |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails)   | Project ID and dataset the file belongs to                |

**Returns:** _string_

_Defined in [src/paths.ts:57](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L57)_

### buildFileUrl

▸ **buildFileUrl**(`asset`: [FileUrlBuilderOptions](README.md#fileurlbuilderoptions), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _string_

Builds the base file URL from the minimal set of parts required to assemble it

| Name      | Type                                                     | Description                                   |
| --------- | -------------------------------------------------------- | --------------------------------------------- |
| `asset`   | [FileUrlBuilderOptions](README.md#fileurlbuilderoptions) | An asset-like shape defining ID and extension |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails)   | Project ID and dataset the file belongs to    |

**Returns:** _string_

_Defined in [src/paths.ts:78](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L78)_

### buildImagePath

▸ **buildImagePath**(`asset`: [ImageUrlBuilderOptions](README.md#imageurlbuilderoptions), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _string_

Builds the base image path from the minimal set of parts required to assemble it

| Name      | Type                                                       | Description                                               |
| --------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| `asset`   | [ImageUrlBuilderOptions](README.md#imageurlbuilderoptions) | An asset-like shape defining ID, dimensions and extension |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails)     | Project ID and dataset the image belongs to               |

**Returns:** _string_

_Defined in [src/paths.ts:21](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L21)_

### buildImageUrl

▸ **buildImageUrl**(`asset`: [ImageUrlBuilderOptions](README.md#imageurlbuilderoptions), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _string_

Builds the base image URL from the minimal set of parts required to assemble it

| Name      | Type                                                       | Description                                               |
| --------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| `asset`   | [ImageUrlBuilderOptions](README.md#imageurlbuilderoptions) | An asset-like shape defining ID, dimensions and extension |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails)     | Project ID and dataset the image belongs to               |

**Returns:** _string_

_Defined in [src/paths.ts:43](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L43)_

### getAssetDocumentId

▸ **getAssetDocumentId**(`src`: [SanityAssetSource](README.md#sanityassetsource)): _string_

Tries to resolve the asset document ID from any inferrable structure

| Name  | Type                                             | Description                                                       |
| ----- | ------------------------------------------------ | ----------------------------------------------------------------- |
| `src` | [SanityAssetSource](README.md#sanityassetsource) | Input source (image/file object, asset, reference, id, url, path) |

**Returns:** _string_

_Defined in [src/resolve.ts:291](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L291)_

### tryGetAssetDocumentId

▸ **tryGetAssetDocumentId**(`src`: [SanityAssetSource](README.md#sanityassetsource)): _string_

Tries to resolve the asset document ID from any inferrable structure

| Name  | Type                                             | Description                                                       |
| ----- | ------------------------------------------------ | ----------------------------------------------------------------- |
| `src` | [SanityAssetSource](README.md#sanityassetsource) | Input source (image/file object, asset, reference, id, url, path) |

**Returns:** _string_

_Defined in [src/resolve.ts:321](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L321)_

### tryGetAssetPath

▸ **tryGetAssetPath**(`src`: [SanityAssetSource](README.md#sanityassetsource)): _string | undefined_

Tries to get the asset path from a given asset source

| Name  | Type                                             | Description                                  |
| ----- | ------------------------------------------------ | -------------------------------------------- |
| `src` | [SanityAssetSource](README.md#sanityassetsource) | The source image to infer an asset path from |

**Returns:** _string | undefined_

_Defined in [src/paths.ts:98](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L98)_

### getDefaultCrop

▸ **getDefaultCrop**(): _[SanityImageCrop](README.md#sanityimagecrop)_

Returns cloned version of the default crop (prevents accidental mutations)

| Name | Type |
| ---- | ---- |


**Returns:** _[SanityImageCrop](README.md#sanityimagecrop)_

_Defined in [src/resolve.ts:65](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L65)_

### getDefaultHotspot

▸ **getDefaultHotspot**(): _[SanityImageHotspot](README.md#sanityimagehotspot)_

Returns cloned version of the default hotspot (prevents accidental mutations)

| Name | Type |
| ---- | ---- |


**Returns:** _[SanityImageHotspot](README.md#sanityimagehotspot)_

_Defined in [src/resolve.ts:72](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L72)_

### getExtension

▸ **getExtension**(`src`: [SanityAssetSource](README.md#sanityassetsource)): _string_

Returns the file extension for a given asset

| Name  | Type                                             | Description                                                       |
| ----- | ------------------------------------------------ | ----------------------------------------------------------------- |
| `src` | [SanityAssetSource](README.md#sanityassetsource) | Input source (file/image object, asset, reference, id, url, path) |

**Returns:** _string_

_Defined in [src/resolve.ts:108](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L108)_

### tryGetExtension

▸ **tryGetExtension**(`src`: [SanityAssetSource](README.md#sanityassetsource)): _string_

Returns the file extension for a given asset

| Name  | Type                                             | Description                                                       |
| ----- | ------------------------------------------------ | ----------------------------------------------------------------- |
| `src` | [SanityAssetSource](README.md#sanityassetsource) | Input source (file/image object, asset, reference, id, url, path) |

**Returns:** _string_

_Defined in [src/resolve.ts:120](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L120)_

### getFile

▸ **getFile**(`src`: [SanityFileSource](README.md#sanityfilesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[ResolvedSanityFile](README.md#resolvedsanityfile)_

Tries to resolve an file object with as much information as possible,
from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                   | Description                                                 |
| --------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| `src`     | [SanityFileSource](README.md#sanityfilesource)         | Input source (file object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the file belongs to                  |

**Returns:** _[ResolvedSanityFile](README.md#resolvedsanityfile)_

_Defined in [src/resolve.ts:220](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L220)_

### tryGetFile

▸ **tryGetFile**(`src`: [SanityFileSource](README.md#sanityfilesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[ResolvedSanityFile](README.md#resolvedsanityfile)_

Tries to resolve an file object with as much information as possible,
from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                   | Description                                                 |
| --------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| `src`     | [SanityFileSource](README.md#sanityfilesource)         | Input source (file object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the file belongs to                  |

**Returns:** _[ResolvedSanityFile](README.md#resolvedsanityfile)_

_Defined in [src/resolve.ts:232](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L232)_

### getFileAsset

▸ **getFileAsset**(`src`: [SanityFileSource](README.md#sanityfilesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[SanityFileAsset](README.md#sanityfileasset)_

Tries to resolve a (partial) file asset document with as much information as possible,
from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                   | Description                                                 |
| --------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| `src`     | [SanityFileSource](README.md#sanityfilesource)         | Input source (file object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the file belongs to                  |

**Returns:** _[SanityFileAsset](README.md#sanityfileasset)_

_Defined in [src/resolve.ts:245](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L245)_

### tryGetFileAsset

▸ **tryGetFileAsset**(`src`: [SanityFileSource](README.md#sanityfilesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[SanityFileAsset](README.md#sanityfileasset)_

Tries to resolve a (partial) file asset document with as much information as possible,
from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                   | Description                                                 |
| --------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| `src`     | [SanityFileSource](README.md#sanityfilesource)         | Input source (file object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the file belongs to                  |

**Returns:** _[SanityFileAsset](README.md#sanityfileasset)_

_Defined in [src/resolve.ts:280](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L280)_

### getIdFromString

▸ **getIdFromString**(`str`: string): _string_

Tries to cooerce a string (ID, URL or path) to an image asset ID

| Name  | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| `str` | string | Input string (ID, URL or path) |

**Returns:** _string_

_Defined in [src/resolve.ts:333](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L333)_

### tryGetIdFromString

▸ **tryGetIdFromString**(`str`: string): _string_

Tries to cooerce a string (ID, URL or path) to an image asset ID

| Name  | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| `str` | string | Input string (ID, URL or path) |

**Returns:** _string_

_Defined in [src/resolve.ts:368](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L368)_

### getImage

▸ **getImage**(`src`: [SanityImageSource](README.md#sanityimagesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[ResolvedSanityImage](README.md#resolvedsanityimage)_

Tries to resolve an image object with as much information as possible,
from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                   | Description                                                  |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](README.md#sanityimagesource)       | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the image belongs to                  |

**Returns:** _[ResolvedSanityImage](README.md#resolvedsanityimage)_

_Defined in [src/resolve.ts:133](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L133)_

### tryGetImage

▸ **tryGetImage**(`src`: [SanityImageSource](README.md#sanityimagesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[ResolvedSanityImage](README.md#resolvedsanityimage)_

Tries to resolve an image object with as much information as possible,
from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                   | Description                                                  |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](README.md#sanityimagesource)       | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the image belongs to                  |

**Returns:** _[ResolvedSanityImage](README.md#resolvedsanityimage)_

_Defined in [src/resolve.ts:154](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L154)_

### getImageAsset

▸ **getImageAsset**(`src`: [SanityImageSource](README.md#sanityimagesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[SanityImageAsset](README.md#sanityimageasset)_

Tries to resolve a (partial) image asset document with as much information as possible,
from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                   | Description                                                  |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](README.md#sanityimagesource)       | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the image belongs to                  |

**Returns:** _[SanityImageAsset](README.md#sanityimageasset)_

_Defined in [src/resolve.ts:167](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L167)_

### tryGetImageAsset

▸ **tryGetImageAsset**(`src`: [SanityImageSource](README.md#sanityimagesource), `project`: [SanityProjectDetails](README.md#sanityprojectdetails)): _[SanityImageAsset](README.md#sanityimageasset)_

Tries to resolve a (partial) image asset document with as much information as possible,
from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                   | Description                                                  |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](README.md#sanityimagesource)       | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](README.md#sanityprojectdetails) | Project ID and dataset the image belongs to                  |

**Returns:** _[SanityImageAsset](README.md#sanityimageasset)_

_Defined in [src/resolve.ts:207](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L207)_

### getImageDimensions

▸ **getImageDimensions**(`src`: [SanityImageSource](README.md#sanityimagesource)): _[SanityImageDimensions](README.md#sanityimagedimensions)_

Returns the width, height and aspect ratio of a passed image asset, from any
inferrable structure (id, url, path, asset document, image object etc)

| Name  | Type                                             | Description                                                  |
| ----- | ------------------------------------------------ | ------------------------------------------------------------ |
| `src` | [SanityImageSource](README.md#sanityimagesource) | Input source (image object, asset, reference, id, url, path) |

**Returns:** _[SanityImageDimensions](README.md#sanityimagedimensions)_

_Defined in [src/resolve.ts:84](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L84)_

### tryGetImageDimensions

▸ **tryGetImageDimensions**(`src`: [SanityImageSource](README.md#sanityimagesource)): _[SanityImageDimensions](README.md#sanityimagedimensions)_

Returns the width, height and aspect ratio of a passed image asset, from any
inferrable structure (id, url, path, asset document, image object etc)

| Name  | Type                                             | Description                                                  |
| ----- | ------------------------------------------------ | ------------------------------------------------------------ |
| `src` | [SanityImageSource](README.md#sanityimagesource) | Input source (image object, asset, reference, id, url, path) |

**Returns:** _[SanityImageDimensions](README.md#sanityimagedimensions)_

_Defined in [src/resolve.ts:97](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L97)_

### getProject

▸ **getProject**(`src`: [SanityImageSource](README.md#sanityimagesource)): _[SanityProjectDetails](README.md#sanityprojectdetails)_

Resolves project ID and dataset the image belongs to, based on full URL or path

| Name  | Type                                             |
| ----- | ------------------------------------------------ |
| `src` | [SanityImageSource](README.md#sanityimagesource) |

**Returns:** _[SanityProjectDetails](README.md#sanityprojectdetails)_

_Defined in [src/resolve.ts:391](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L391)_

### tryGetProject

▸ **tryGetProject**(`src`: [SanityImageSource](README.md#sanityimagesource)): _[SanityProjectDetails](README.md#sanityprojectdetails)_

Resolves project ID and dataset the image belongs to, based on full URL or path

| Name  | Type                                             |
| ----- | ------------------------------------------------ |
| `src` | [SanityImageSource](README.md#sanityimagesource) |

**Returns:** _[SanityProjectDetails](README.md#sanityprojectdetails)_

_Defined in [src/resolve.ts:411](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L411)_

### getUrlFilename

▸ **getUrlFilename**(`url`: string): _string_

Strips the CDN URL, path and query params from a URL, eg:
`https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
`filename-200x200.jpg`

| Name  | Type   | Description              |
| ----- | ------ | ------------------------ |
| `url` | string | URL to get filename from |

**Returns:** _string_

_Defined in [src/paths.ts:163](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L163)_

### tryGetUrlFilename

▸ **tryGetUrlFilename**(`url`: string): _string_

Strips the CDN URL, path and query params from a URL, eg:
`https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
`filename-200x200.jpg`

| Name  | Type   | Description              |
| ----- | ------ | ------------------------ |
| `url` | string | URL to get filename from |

**Returns:** _string_

_Defined in [src/paths.ts:179](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L179)_

### getUrlPath

▸ **getUrlPath**(`url`: string): _string_

Strips the CDN URL and query params from a URL, eg:
`https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
`images/project/dataset/filename-200x200.jpg`

| Name  | Type   | Description               |
| ----- | ------ | ------------------------- |
| `url` | string | URL to get path name from |

**Returns:** _string_

_Defined in [src/paths.ts:131](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L131)_

### tryGetUrlPath

▸ **tryGetUrlPath**(`url`: string): _string_

Strips the CDN URL and query params from a URL, eg:
`https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
`images/project/dataset/filename-200x200.jpg`

| Name  | Type   | Description               |
| ----- | ------ | ------------------------- |
| `url` | string | URL to get path name from |

**Returns:** _string_

_Defined in [src/paths.ts:152](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L152)_

### hasPath

▸ **hasPath**(`urlOrPath`: string): _boolean_

Checks whether or not the given URL contains an asset path

| Name        | Type   |
| ----------- | ------ |
| `urlOrPath` | string |

**Returns:** _boolean_

_Defined in [src/paths.ts:88](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L88)_

### idFromUrl

▸ **idFromUrl**(`url`: string): _string_

Converts from a full asset URL to just the asset document ID

| Name  | Type   | Description                 |
| ----- | ------ | --------------------------- |
| `url` | string | A full asset URL to convert |

**Returns:** _string_

_Defined in [src/resolve.ts:376](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L376)_

### isAssetFilename

▸ **isAssetFilename**(`filename`: string): _boolean_

Returns whether or not the passed filename is a valid file or image asset filename

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| `filename` | string | Filename to validate |

**Returns:** _boolean_

_Defined in [src/resolve.ts:439](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L439)_

### isAssetIdStub

▸ **isAssetIdStub**(`stub`: unknown): _stub is [SanityAssetIdStub](README.md#sanityassetidstub)_

Checks whether or not the given source is an asset ID stub
(an object containing an `_id` property)

| Name   | Type    | Description            |
| ------ | ------- | ---------------------- |
| `stub` | unknown | Possible asset id stub |

**Returns:** _stub is [SanityAssetIdStub](README.md#sanityassetidstub)_

_Defined in [src/types.ts:108](https://github.com/sanity-io/asset-utils/blob/master/src/types.ts#L108)_

### isAssetObjectStub

▸ **isAssetObjectStub**(`stub`: unknown): _stub is [SanityAssetObjectStub](README.md#sanityassetobjectstub)_

Checks whether or not the given source is an asset object stub

| Name   | Type    | Description                |
| ------ | ------- | -------------------------- |
| `stub` | unknown | Possible asset object stub |

**Returns:** _stub is [SanityAssetObjectStub](README.md#sanityassetobjectstub)_

_Defined in [src/types.ts:251](https://github.com/sanity-io/asset-utils/blob/master/src/types.ts#L251)_

### isAssetPathStub

▸ **isAssetPathStub**(`stub`: unknown): _stub is [SanityAssetPathStub](README.md#sanityassetpathstub)_

Checks whether or not the given source is an asset path stub
(an object containing a `path` property)

| Name   | Type    | Description              |
| ------ | ------- | ------------------------ |
| `stub` | unknown | Possible asset path stub |

**Returns:** _stub is [SanityAssetPathStub](README.md#sanityassetpathstub)_

_Defined in [src/types.ts:123](https://github.com/sanity-io/asset-utils/blob/master/src/types.ts#L123)_

### isAssetUrlStub

▸ **isAssetUrlStub**(`stub`: unknown): _stub is [SanityAssetUrlStub](README.md#sanityasseturlstub)_

Checks whether or not the given source is an asset URL stub
(an object containing a `url` property)

| Name   | Type    | Description             |
| ------ | ------- | ----------------------- |
| `stub` | unknown | Possible asset url stub |

**Returns:** _stub is [SanityAssetUrlStub](README.md#sanityasseturlstub)_

_Defined in [src/types.ts:138](https://github.com/sanity-io/asset-utils/blob/master/src/types.ts#L138)_

### isFileAssetFilename

▸ **isFileAssetFilename**(`filename`: string): _boolean_

Returns whether or not the passed filename is a valid file asset filename

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| `filename` | string | Filename to validate |

**Returns:** _boolean_

_Defined in [src/resolve.ts:429](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L429)_

### isFileSource

▸ **isFileSource**(`src`: [SanityAssetSource](README.md#sanityassetsource)): _src is [SanityFileSource](README.md#sanityfilesource)_

| Name  | Type                                             |
| ----- | ------------------------------------------------ |
| `src` | [SanityAssetSource](README.md#sanityassetsource) |

**Returns:** _src is [SanityFileSource](README.md#sanityfilesource)_

_Defined in [src/resolve.ts:443](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L443)_

### isImageAssetFilename

▸ **isImageAssetFilename**(`filename`: string): _boolean_

Returns whether or not the passed filename is a valid image asset filename

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| `filename` | string | Filename to validate |

**Returns:** _boolean_

_Defined in [src/resolve.ts:419](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L419)_

### isImageSource

▸ **isImageSource**(`src`: [SanityAssetSource](README.md#sanityassetsource)): _src is [SanityImageSource](README.md#sanityimagesource)_

| Name  | Type                                             |
| ----- | ------------------------------------------------ |
| `src` | [SanityAssetSource](README.md#sanityassetsource) |

**Returns:** _src is [SanityImageSource](README.md#sanityimagesource)_

_Defined in [src/resolve.ts:448](https://github.com/sanity-io/asset-utils/blob/master/src/resolve.ts#L448)_

### isReference

▸ **isReference**(`ref`: unknown): _ref is [SanityReference](README.md#sanityreference)_

Checks whether or not the given source is a Sanity reference
(an object containing \_ref string key)

| Name  | Type    | Description        |
| ----- | ------- | ------------------ |
| `ref` | unknown | Possible reference |

**Returns:** _ref is [SanityReference](README.md#sanityreference)_

_Defined in [src/types.ts:93](https://github.com/sanity-io/asset-utils/blob/master/src/types.ts#L93)_

### isSanityFileAsset

▸ **isSanityFileAsset**(`src`: unknown): _src is [SanityFileAsset](README.md#sanityfileasset)_

Checks whether or not the given source is a (partial) sanity file asset document.
Only checks the `_type` property, all other properties _may_ be missing

| Name  | Type    | Description     |
| ----- | ------- | --------------- |
| `src` | unknown | Source to check |

**Returns:** _src is [SanityFileAsset](README.md#sanityfileasset)_

_Defined in [src/types.ts:169](https://github.com/sanity-io/asset-utils/blob/master/src/types.ts#L169)_

### isUnresolvableError

▸ **isUnresolvableError**(`err`: Error): _err is [UnresolvableError](README.md#unresolvableerror)_

Checks whether or not an error instance is of type UnresolvableError

| Name  | Type  | Description                                |
| ----- | ----- | ------------------------------------------ |
| `err` | Error | Error to check for unresolvable error type |

**Returns:** _err is [UnresolvableError](README.md#unresolvableerror)_

_Defined in [src/utils.ts:36](https://github.com/sanity-io/asset-utils/blob/master/src/utils.ts#L36)_

### isValidFilename

▸ **isValidFilename**(`filename`: string): _boolean_

Checks whether or not a given filename matches the expected Sanity asset filename pattern

| Name       | Type   | Description                    |
| ---------- | ------ | ------------------------------ |
| `filename` | string | Filename to check for validity |

**Returns:** _boolean_

_Defined in [src/paths.ts:187](https://github.com/sanity-io/asset-utils/blob/master/src/paths.ts#L187)_

### parseAssetFilename

▸ **parseAssetFilename**(`filename`: string): _[SanityAssetIdParts](README.md#sanityassetidparts)_

Parses a Sanity asset filename into individual parts (type, id, extension, width, height)

| Name       | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| `filename` | string | Filename to parse into named parts |

**Returns:** _[SanityAssetIdParts](README.md#sanityassetidparts)_

_Defined in [src/parse.ts:77](https://github.com/sanity-io/asset-utils/blob/master/src/parse.ts#L77)_

### parseAssetId

▸ **parseAssetId**(`documentId`: string): _[SanityAssetIdParts](README.md#sanityassetidparts)_

Parses a Sanity asset document ID into individual parts (type, id, extension, width/height etc)

| Name         | Type   | Description                           |
| ------------ | ------ | ------------------------------------- |
| `documentId` | string | Document ID to parse into named parts |

**Returns:** _[SanityAssetIdParts](README.md#sanityassetidparts)_

_Defined in [src/parse.ts:22](https://github.com/sanity-io/asset-utils/blob/master/src/parse.ts#L22)_

### parseFileAssetId

▸ **parseFileAssetId**(`documentId`: string): _[SanityFileAssetIdParts](README.md#sanityfileassetidparts)_

Parses a Sanity file asset document ID into individual parts (type, id, extension)

| Name         | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| `documentId` | string | File asset document ID to parse into named parts |

**Returns:** _[SanityFileAssetIdParts](README.md#sanityfileassetidparts)_

_Defined in [src/parse.ts:41](https://github.com/sanity-io/asset-utils/blob/master/src/parse.ts#L41)_

### parseImageAssetId

▸ **parseImageAssetId**(`documentId`: string): _[SanityImageAssetIdParts](README.md#sanityimageassetidparts)_

Parses a Sanity image asset document ID into individual parts (type, id, extension, width, height)

| Name         | Type   | Description                                       |
| ------------ | ------ | ------------------------------------------------- |
| `documentId` | string | Image asset document ID to parse into named parts |

**Returns:** _[SanityImageAssetIdParts](README.md#sanityimageassetidparts)_

_Defined in [src/parse.ts:59](https://github.com/sanity-io/asset-utils/blob/master/src/parse.ts#L59)_

## License

MIT-licensed. See LICENSE.
