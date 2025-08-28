<!-- This file is AUTO-GENERATED, edit _README.template.md or tweak scripts/generateDocs.ts -->

# @sanity/asset-utils

Reusable utility functions for dealing with image and file assets in Sanity.

> [!IMPORTANT]
> This package does _not_ resolve any information from the Sanity APIs - it does no asynchronous operations and only has the information that you pass it. You cannot, for instance, get the LQIP, BlurHash, image palette and similar information without requesting it from the Sanity API.

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

An [HTML version](https://sanity-io.github.io/asset-utils/) is also available, which also includes interface definitions, constants and more.

### Functions

- [buildFilePath](#buildfilepath)
- [buildFileUrl](#buildfileurl)
- [buildImagePath](#buildimagepath)
- [buildImageUrl](#buildimageurl)
- [getAssetDocumentId](#getassetdocumentid)
- [getAssetUrlType](#getasseturltype)
- [getDefaultCrop](#getdefaultcrop)
- [getDefaultHotspot](#getdefaulthotspot)
- [getExtension](#getextension)
- [getFile](#getfile)
- [getFileAsset](#getfileasset)
- [getIdFromString](#getidfromstring)
- [getImage](#getimage)
- [getImageAsset](#getimageasset)
- [getImageDimensions](#getimagedimensions)
- [getProject](#getproject)
- [getUrlFilename](#geturlfilename)
- [getUrlPath](#geturlpath)
- [getVanityStub](#getvanitystub)
- [isAssetFilename](#isassetfilename)
- [isAssetId](#isassetid)
- [isAssetIdStub](#isassetidstub)
- [isAssetObjectStub](#isassetobjectstub)
- [isAssetPathStub](#isassetpathstub)
- [isAssetUrlStub](#isasseturlstub)
- [isDefaultCrop](#isdefaultcrop)
- [isDefaultHotspot](#isdefaulthotspot)
- [isFileAssetFilename](#isfileassetfilename)
- [isFileAssetId](#isfileassetid)
- [isFileSource](#isfilesource)
- [isImageAssetFilename](#isimageassetfilename)
- [isImageAssetId](#isimageassetid)
- [isImageSource](#isimagesource)
- [isInProgressUpload](#isinprogressupload)
- [isReference](#isreference)
- [isSanityAssetUrl](#issanityasseturl)
- [isSanityFileAsset](#issanityfileasset)
- [isSanityFileUrl](#issanityfileurl)
- [isSanityImageAsset](#issanityimageasset)
- [isSanityImageUrl](#issanityimageurl)
- [isUnresolvableError](#isunresolvableerror)
- [isValidFilename](#isvalidfilename)
- [parseAssetFilename](#parseassetfilename)
- [parseAssetId](#parseassetid)
- [parseAssetUrl](#parseasseturl)
- [parseFileAssetId](#parsefileassetid)
- [parseFileAssetUrl](#parsefileasseturl)
- [parseImageAssetId](#parseimageassetid)
- [parseImageAssetUrl](#parseimageasseturl)
- [tryGetAssetDocumentId](#trygetassetdocumentid)
- [tryGetAssetPath](#trygetassetpath)
- [tryGetExtension](#trygetextension)
- [tryGetFile](#trygetfile)
- [tryGetFileAsset](#trygetfileasset)
- [tryGetIdFromString](#trygetidfromstring)
- [tryGetImage](#trygetimage)
- [tryGetImageAsset](#trygetimageasset)
- [tryGetImageDimensions](#trygetimagedimensions)
- [tryGetProject](#trygetproject)
- [tryGetUrlFilename](#trygeturlfilename)
- [tryGetUrlPath](#trygeturlpath)

### buildFilePath

▸ **buildFilePath**(`asset`: [SanityFileUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityFileUrlParts.html) | [FileUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/FileUrlBuilderOptions.html), `options`?: [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)): _string_

Builds the base file path from the minimal set of parts required to assemble it

| Name      | Type                                                                                                                                                                                                       | Description                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `asset`   | [SanityFileUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityFileUrlParts.html) \| [FileUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/FileUrlBuilderOptions.html) | An asset-like shape defining ID, dimensions and extension                         |
| `options` | [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)                                                                                                           | (_Optional_) Project ID and dataset the file belongs to, along with other options |

**Returns:** _string_

_Defined in [src/paths.ts:77](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L77)_

### buildFileUrl

▸ **buildFileUrl**(`asset`: [FileUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/FileUrlBuilderOptions.html), `options`?: [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)): _string_

Builds the base file URL from the minimal set of parts required to assemble it

| Name      | Type                                                                                                   | Description                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `asset`   | [FileUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/FileUrlBuilderOptions.html) | An asset-like shape defining ID and extension                                     |
| `options` | [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)       | (_Optional_) Project ID and dataset the file belongs to, along with other options |

**Returns:** _string_

_Defined in [src/paths.ts:102](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L102)_

### buildImagePath

▸ **buildImagePath**(`asset`: [SanityImageUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUrlParts.html) | [ImageUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/ImageUrlBuilderOptions.html), `options`?: [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)): _string_

Builds the base image path from the minimal set of parts required to assemble it

| Name      | Type                                                                                                                                                                                                           | Description                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `asset`   | [SanityImageUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUrlParts.html) \| [ImageUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/ImageUrlBuilderOptions.html) | An asset-like shape defining ID, dimensions and extension                          |
| `options` | [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)                                                                                                               | (_Optional_) Project ID and dataset the image belongs to, along with other options |

**Returns:** _string_

_Defined in [src/paths.ts:33](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L33)_

### buildImageUrl

▸ **buildImageUrl**(`asset`: [SanityImageUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUrlParts.html) | [ImageUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/ImageUrlBuilderOptions.html), `options`?: [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)): _string_

Builds the base image URL from the minimal set of parts required to assemble it

| Name      | Type                                                                                                                                                                                                           | Description                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `asset`   | [SanityImageUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUrlParts.html) \| [ImageUrlBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/ImageUrlBuilderOptions.html) | An asset-like shape defining ID, dimensions and extension |
| `options` | [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)                                                                                                               | (_Optional_) Project ID and dataset the image belongs to  |

**Returns:** _string_

_Defined in [src/paths.ts:61](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L61)_

### getAssetDocumentId

▸ **getAssetDocumentId**(`src`: unknown): _string_

Tries to resolve the asset document ID from any inferrable structure

| Name  | Type    | Description                                                       |
| ----- | ------- | ----------------------------------------------------------------- |
| `src` | unknown | Input source (image/file object, asset, reference, id, url, path) |

**Returns:** _string_

_Defined in [src/resolve.ts:331](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L331)_

### getAssetUrlType

▸ **getAssetUrlType**(`url`: string): _"image" | "file" | false_

Validates that a given URL is a Sanity asset URL, and returns the asset type if valid.

| Name  | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| `url` | string | URL to extract asset type from |

**Returns:** _"image" | "file" | false_

_Defined in [src/parse.ts:183](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L183)_

### getDefaultCrop

▸ **getDefaultCrop**(): _[SanityImageCrop](https://sanity-io.github.io/asset-utils/interfaces/SanityImageCrop.html)_

Returns cloned version of the default crop (prevents accidental mutations)

**Returns:** _[SanityImageCrop](https://sanity-io.github.io/asset-utils/interfaces/SanityImageCrop.html)_

_Defined in [src/hotspotCrop.ts:33](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/hotspotCrop.ts#L33)_

### getDefaultHotspot

▸ **getDefaultHotspot**(): _[SanityImageHotspot](https://sanity-io.github.io/asset-utils/interfaces/SanityImageHotspot.html)_

Returns cloned version of the default hotspot (prevents accidental mutations)

**Returns:** _[SanityImageHotspot](https://sanity-io.github.io/asset-utils/interfaces/SanityImageHotspot.html)_

_Defined in [src/hotspotCrop.ts:41](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/hotspotCrop.ts#L41)_

### getExtension

▸ **getExtension**(`src`: [SanityAssetSource](https://sanity-io.github.io/asset-utils/types/SanityAssetSource.html)): _string_

Returns the file extension for a given asset

| Name  | Type                                                                                      | Description                                                       |
| ----- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `src` | [SanityAssetSource](https://sanity-io.github.io/asset-utils/types/SanityAssetSource.html) | Input source (file/image object, asset, reference, id, url, path) |

**Returns:** _string_

_Defined in [src/resolve.ts:93](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L93)_

### getFile

▸ **getFile**(`src`: [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html), `project`?: [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)): _[ResolvedSanityFile](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityFile.html)_

Tries to resolve an file object with as much information as possible, from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                                                                 | Description                                                 |
| --------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `src`     | [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html)              | Input source (file object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | (_Optional_) Project ID and dataset the file belongs to     |

**Returns:** _[ResolvedSanityFile](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityFile.html)_

_Defined in [src/resolve.ts:233](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L233)_

### getFileAsset

▸ **getFileAsset**(`src`: [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html), `options`?: [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)): _[SanityFileAsset](https://sanity-io.github.io/asset-utils/types/SanityFileAsset.html)_

Tries to resolve a (partial) file asset document with as much information as possible, from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                                                             | Description                                                                       |
| --------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `src`     | [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html)          | Input source (file object, asset, reference, id, url, path)                       |
| `options` | [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html) | (_Optional_) Project ID and dataset the file belongs to, along with other options |

**Returns:** _[SanityFileAsset](https://sanity-io.github.io/asset-utils/types/SanityFileAsset.html)_

_Defined in [src/resolve.ts:274](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L274)_

### getIdFromString

▸ **getIdFromString**(`str`: string): _string_

Tries to cooerce a string (ID, URL or path) to an image asset ID

| Name  | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| `str` | string | Input string (ID, URL or path) |

**Returns:** _string_

_Defined in [src/resolve.ts:380](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L380)_

### getImage

▸ **getImage**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html), `project`?: [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)): _[ResolvedSanityImage](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityImage.html)_

Tries to resolve an image object with as much information as possible, from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                                                                 | Description                                                  |
| --------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)            | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | (_Optional_) Project ID and dataset the image belongs to     |

**Returns:** _[ResolvedSanityImage](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityImage.html)_

_Defined in [src/resolve.ts:124](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L124)_

### getImageAsset

▸ **getImageAsset**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html), `project`?: [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)): _[SanityImageAsset](https://sanity-io.github.io/asset-utils/types/SanityImageAsset.html)_

Tries to resolve a (partial) image asset document with as much information as possible, from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                                                                 | Description                                                  |
| --------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)            | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | (_Optional_) Project ID and dataset the image belongs to     |

**Returns:** _[SanityImageAsset](https://sanity-io.github.io/asset-utils/types/SanityImageAsset.html)_

_Defined in [src/resolve.ts:178](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L178)_

### getImageDimensions

▸ **getImageDimensions**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)): _[SanityImageDimensions](https://sanity-io.github.io/asset-utils/types/SanityImageDimensions.html)_

Returns the width, height and aspect ratio of a passed image asset, from any inferrable structure (id, url, path, asset document, image object etc)

| Name  | Type                                                                                      | Description                                                  |
| ----- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src` | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html) | Input source (image object, asset, reference, id, url, path) |

**Returns:** _[SanityImageDimensions](https://sanity-io.github.io/asset-utils/types/SanityImageDimensions.html)_

_Defined in [src/resolve.ts:63](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L63)_

### getProject

▸ **getProject**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)): _[SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)_

Resolves project ID and dataset the image belongs to, based on full URL or path

| Name  | Type                                                                                      | Description       |
| ----- | ----------------------------------------------------------------------------------------- | ----------------- |
| `src` | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html) | Image URL or path |

**Returns:** _[SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)_

_Defined in [src/resolve.ts:442](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L442)_

### getUrlFilename

▸ **getUrlFilename**(`url`: string): _string_

Strips the CDN URL, path and query params from a URL, eg: `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` → `filename-200x200.jpg`

| Name  | Type   | Description              |
| ----- | ------ | ------------------------ |
| `url` | string | URL to get filename from |

**Returns:** _string_

_Defined in [src/paths.ts:189](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L189)_

### getUrlPath

▸ **getUrlPath**(`url`: string): _string_

Strips the CDN URL and query params from a URL, eg: `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` → `images/project/dataset/filename-200x200.jpg`

| Name  | Type   | Description               |
| ----- | ------ | ------------------------- |
| `url` | string | URL to get path name from |

**Returns:** _string_

_Defined in [src/paths.ts:159](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L159)_

### getVanityStub

▸ **getVanityStub**(`originalFilename`: string | undefined, `vanityFilename`: string | undefined, `options`?: [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)): _string_

Get the "path stub" at the end of the path, if the user hasn't explicitly opted out of this behavior

| Name               | Type                                                                                             | Description                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `originalFilename` | string \| undefined                                                                              | The original filename of the asset                               |
| `vanityFilename`   | string \| undefined                                                                              | The vanity filename of the asset                                 |
| `options`          | [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html) | (_Optional_) Options to control the behavior of the path builder |

**Returns:** _string_

_Defined in [src/paths.ts:226](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L226)_

### isAssetFilename

▸ **isAssetFilename**(`filename`: string): _boolean_

Returns whether or not the passed filename is a valid file or image asset filename

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| `filename` | string | Filename to validate |

**Returns:** _boolean_

_Defined in [src/resolve.ts:492](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L492)_

### isAssetId

▸ **isAssetId**(`documentId`: string): _boolean_

Checks whether or not the given document ID is a valid Sanity asset document ID (file or image)

| Name         | Type   | Description          |
| ------------ | ------ | -------------------- |
| `documentId` | string | Document ID to check |

**Returns:** _boolean_

_Defined in [src/asserters.ts:121](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L121)_

### isAssetIdStub

▸ **isAssetIdStub**(`stub`: unknown): _stub is [SanityAssetIdStub](https://sanity-io.github.io/asset-utils/interfaces/SanityAssetIdStub.html)_

Checks whether or not the given source is an asset ID stub (an object containing an `_id` property)

| Name   | Type    | Description            |
| ------ | ------- | ---------------------- |
| `stub` | unknown | Possible asset id stub |

**Returns:** _stub is [SanityAssetIdStub](https://sanity-io.github.io/asset-utils/interfaces/SanityAssetIdStub.html)_

_Defined in [src/asserters.ts:40](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L40)_

### isAssetObjectStub

▸ **isAssetObjectStub**(`stub`: unknown): _stub is [SanityAssetObjectStub](https://sanity-io.github.io/asset-utils/types/SanityAssetObjectStub.html)_

Checks whether or not the given source is an asset object stub

| Name   | Type    | Description                |
| ------ | ------- | -------------------------- |
| `stub` | unknown | Possible asset object stub |

**Returns:** _stub is [SanityAssetObjectStub](https://sanity-io.github.io/asset-utils/types/SanityAssetObjectStub.html)_

_Defined in [src/asserters.ts:132](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L132)_

### isAssetPathStub

▸ **isAssetPathStub**(`stub`: unknown): _stub is [SanityAssetPathStub](https://sanity-io.github.io/asset-utils/interfaces/SanityAssetPathStub.html)_

Checks whether or not the given source is an asset path stub (an object containing a `path` property)

| Name   | Type    | Description              |
| ------ | ------- | ------------------------ |
| `stub` | unknown | Possible asset path stub |

**Returns:** _stub is [SanityAssetPathStub](https://sanity-io.github.io/asset-utils/interfaces/SanityAssetPathStub.html)_

_Defined in [src/asserters.ts:52](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L52)_

### isAssetUrlStub

▸ **isAssetUrlStub**(`stub`: unknown): _stub is [SanityAssetUrlStub](https://sanity-io.github.io/asset-utils/interfaces/SanityAssetUrlStub.html)_

Checks whether or not the given source is an asset URL stub (an object containing a `url` property)

| Name   | Type    | Description             |
| ------ | ------- | ----------------------- |
| `stub` | unknown | Possible asset url stub |

**Returns:** _stub is [SanityAssetUrlStub](https://sanity-io.github.io/asset-utils/interfaces/SanityAssetUrlStub.html)_

_Defined in [src/asserters.ts:64](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L64)_

### isDefaultCrop

▸ **isDefaultCrop**(`crop`: [SanityImageCrop](https://sanity-io.github.io/asset-utils/interfaces/SanityImageCrop.html)): _boolean_

Returns whether or not the passed crop has the default values for a crop region

| Name   | Type                                                                                       | Description                                           |
| ------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `crop` | [SanityImageCrop](https://sanity-io.github.io/asset-utils/interfaces/SanityImageCrop.html) | The crop to return whether or not is the default crop |

**Returns:** _boolean_

_Defined in [src/hotspotCrop.ts:50](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/hotspotCrop.ts#L50)_

### isDefaultHotspot

▸ **isDefaultHotspot**(`hotspot`: [SanityImageHotspot](https://sanity-io.github.io/asset-utils/interfaces/SanityImageHotspot.html)): _boolean_

Returns whether or not the passed hotspot has the default values for a hotspot region

| Name      | Type                                                                                             | Description                                                 |
| --------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `hotspot` | [SanityImageHotspot](https://sanity-io.github.io/asset-utils/interfaces/SanityImageHotspot.html) | The hotspot to return whether or not is the default hotspot |

**Returns:** _boolean_

_Defined in [src/hotspotCrop.ts:71](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/hotspotCrop.ts#L71)_

### isFileAssetFilename

▸ **isFileAssetFilename**(`filename`: string): _boolean_

Returns whether or not the passed filename is a valid file asset filename

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| `filename` | string | Filename to validate |

**Returns:** _boolean_

_Defined in [src/resolve.ts:481](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L481)_

### isFileAssetId

▸ **isFileAssetId**(`documentId`: string): _boolean_

Checks whether or not the given document ID is a valid Sanity file asset document ID

| Name         | Type   | Description          |
| ------------ | ------ | -------------------- |
| `documentId` | string | Document ID to check |

**Returns:** _boolean_

_Defined in [src/asserters.ts:110](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L110)_

### isFileSource

▸ **isFileSource**(`src`: unknown): _src is [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html)_

Return whether or not the passed source is a file source

| Name  | Type    | Description     |
| ----- | ------- | --------------- |
| `src` | unknown | Source to check |

**Returns:** _src is [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html)_

_Defined in [src/resolve.ts:503](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L503)_

### isImageAssetFilename

▸ **isImageAssetFilename**(`filename`: string): _boolean_

Returns whether or not the passed filename is a valid image asset filename

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| `filename` | string | Filename to validate |

**Returns:** _boolean_

_Defined in [src/resolve.ts:470](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L470)_

### isImageAssetId

▸ **isImageAssetId**(`documentId`: string): _boolean_

Checks whether or not the given document ID is a valid Sanity image asset document ID

| Name         | Type   | Description          |
| ------------ | ------ | -------------------- |
| `documentId` | string | Document ID to check |

**Returns:** _boolean_

_Defined in [src/asserters.ts:99](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L99)_

### isImageSource

▸ **isImageSource**(`src`: unknown): _src is [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)_

Return whether or not the passed source is an image source

| Name  | Type    | Description     |
| ----- | ------- | --------------- |
| `src` | unknown | Source to check |

**Returns:** _src is [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)_

_Defined in [src/resolve.ts:515](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L515)_

### isInProgressUpload

▸ **isInProgressUpload**(`stub`: unknown): _stub is [SanityFileUploadStub](https://sanity-io.github.io/asset-utils/interfaces/SanityFileUploadStub.html) | [SanityImageUploadStub](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUploadStub.html)_

Checks whether or not the given source is an in-progress upload (has upload property but no asset property)

| Name   | Type    | Description                 |
| ------ | ------- | --------------------------- |
| `stub` | unknown | Possible in-progress upload |

**Returns:** _stub is [SanityFileUploadStub](https://sanity-io.github.io/asset-utils/interfaces/SanityFileUploadStub.html) | [SanityImageUploadStub](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUploadStub.html)_

_Defined in [src/asserters.ts:145](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L145)_

### isReference

▸ **isReference**(`ref`: unknown): _ref is [SanityReference](https://sanity-io.github.io/asset-utils/interfaces/SanityReference.html)_

Checks whether or not the given source is a Sanity reference (an object containing \_ref string key)

| Name  | Type    | Description        |
| ----- | ------- | ------------------ |
| `ref` | unknown | Possible reference |

**Returns:** _ref is [SanityReference](https://sanity-io.github.io/asset-utils/interfaces/SanityReference.html)_

_Defined in [src/asserters.ts:28](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L28)_

### isSanityAssetUrl

▸ **isSanityAssetUrl**(`url`: string): _boolean_

Checks whether or not a given URL is a valid Sanity asset URL

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| `url` | string | URL to test |

**Returns:** _boolean_

_Defined in [src/urls.ts:10](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/urls.ts#L10)_

### isSanityFileAsset

▸ **isSanityFileAsset**(`src`: unknown): _src is [SanityFileAsset](https://sanity-io.github.io/asset-utils/types/SanityFileAsset.html)_

Checks whether or not the given source is a (partial) sanity file asset document. Only checks the `_type` property, all other properties _may_ be missing

| Name  | Type    | Description     |
| ----- | ------- | --------------- |
| `src` | unknown | Source to check |

**Returns:** _src is [SanityFileAsset](https://sanity-io.github.io/asset-utils/types/SanityFileAsset.html)_

_Defined in [src/asserters.ts:76](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L76)_

### isSanityFileUrl

▸ **isSanityFileUrl**(`url`: string): _boolean_

Checks whether or not a given URL is a valid Sanity file asset URL

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| `url` | string | URL to test |

**Returns:** _boolean_

_Defined in [src/urls.ts:32](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/urls.ts#L32)_

### isSanityImageAsset

▸ **isSanityImageAsset**(`src`: unknown): _src is [SanityImageAsset](https://sanity-io.github.io/asset-utils/types/SanityImageAsset.html)_

Checks whether or not the given source is a (partial) sanity image asset document. Only checks the `_type` property, all other properties _may_ be missing

| Name  | Type    | Description     |
| ----- | ------- | --------------- |
| `src` | unknown | Source to check |

**Returns:** _src is [SanityImageAsset](https://sanity-io.github.io/asset-utils/types/SanityImageAsset.html)_

_Defined in [src/asserters.ts:88](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/asserters.ts#L88)_

### isSanityImageUrl

▸ **isSanityImageUrl**(`url`: string): _boolean_

Checks whether or not a given URL is a valid Sanity image asset URL

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| `url` | string | URL to test |

**Returns:** _boolean_

_Defined in [src/urls.ts:21](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/urls.ts#L21)_

### isUnresolvableError

▸ **isUnresolvableError**(`err`: unknown): _err is [UnresolvableError](https://sanity-io.github.io/asset-utils/classes/UnresolvableError.html)_

Checks whether or not an error instance is of type UnresolvableError

| Name  | Type    | Description                                |
| ----- | ------- | ------------------------------------------ |
| `err` | unknown | Error to check for unresolvable error type |

**Returns:** _err is [UnresolvableError](https://sanity-io.github.io/asset-utils/classes/UnresolvableError.html)_

_Defined in [src/errors.ts:29](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/errors.ts#L29)_

### isValidFilename

▸ **isValidFilename**(`filename`: string): _boolean_

Checks whether or not a given filename matches the expected Sanity asset filename pattern

| Name       | Type   | Description                    |
| ---------- | ------ | ------------------------------ |
| `filename` | string | Filename to check for validity |

**Returns:** _boolean_

_Defined in [src/paths.ts:213](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L213)_

### parseAssetFilename

▸ **parseAssetFilename**(`filename`: string): _[SanityAssetIdParts](https://sanity-io.github.io/asset-utils/types/SanityAssetIdParts.html)_

Parses a Sanity asset filename into individual parts (type, id, extension, width, height)

| Name       | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| `filename` | string | Filename to parse into named parts |

**Returns:** _[SanityAssetIdParts](https://sanity-io.github.io/asset-utils/types/SanityAssetIdParts.html)_

_Defined in [src/parse.ts:94](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L94)_

### parseAssetId

▸ **parseAssetId**(`documentId`: string): _[SanityAssetIdParts](https://sanity-io.github.io/asset-utils/types/SanityAssetIdParts.html)_

Parses a Sanity asset document ID into individual parts (type, id, extension, width/height etc)

| Name         | Type   | Description                           |
| ------------ | ------ | ------------------------------------- |
| `documentId` | string | Document ID to parse into named parts |

**Returns:** _[SanityAssetIdParts](https://sanity-io.github.io/asset-utils/types/SanityAssetIdParts.html)_

_Defined in [src/parse.ts:36](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L36)_

### parseAssetUrl

▸ **parseAssetUrl**(`url`: string): _[SanityAssetUrlParts](https://sanity-io.github.io/asset-utils/types/SanityAssetUrlParts.html)_

Parses a full Sanity asset URL into individual parts (type, project ID, dataset, id, extension, width, height)

| Name  | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| `url` | string | Full URL to parse into named parts |

**Returns:** _[SanityAssetUrlParts](https://sanity-io.github.io/asset-utils/types/SanityAssetUrlParts.html)_

_Defined in [src/parse.ts:118](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L118)_

### parseFileAssetId

▸ **parseFileAssetId**(`documentId`: string): _[SanityFileAssetIdParts](https://sanity-io.github.io/asset-utils/interfaces/SanityFileAssetIdParts.html)_

Parses a Sanity file asset document ID into individual parts (type, id, extension)

| Name         | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| `documentId` | string | File asset document ID to parse into named parts |

**Returns:** _[SanityFileAssetIdParts](https://sanity-io.github.io/asset-utils/interfaces/SanityFileAssetIdParts.html)_

_Defined in [src/parse.ts:56](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L56)_

### parseFileAssetUrl

▸ **parseFileAssetUrl**(`url`: string): _[SanityFileUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityFileUrlParts.html)_

Parses a full Sanity file asset URL into individual parts (type, project ID, dataset, id, extension, width, height)

| Name  | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| `url` | string | Full URL to parse into named parts |

**Returns:** _[SanityFileUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityFileUrlParts.html)_

_Defined in [src/parse.ts:167](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L167)_

### parseImageAssetId

▸ **parseImageAssetId**(`documentId`: string): _[SanityImageAssetIdParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageAssetIdParts.html)_

Parses a Sanity image asset document ID into individual parts (type, id, extension, width, height)

| Name         | Type   | Description                                       |
| ------------ | ------ | ------------------------------------------------- |
| `documentId` | string | Image asset document ID to parse into named parts |

**Returns:** _[SanityImageAssetIdParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageAssetIdParts.html)_

_Defined in [src/parse.ts:75](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L75)_

### parseImageAssetUrl

▸ **parseImageAssetUrl**(`url`: string): _[SanityImageUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUrlParts.html)_

Parses a full Sanity image asset URL into individual parts (type, project ID, dataset, id, extension, width, height)

| Name  | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| `url` | string | Full URL to parse into named parts |

**Returns:** _[SanityImageUrlParts](https://sanity-io.github.io/asset-utils/interfaces/SanityImageUrlParts.html)_

_Defined in [src/parse.ts:149](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/parse.ts#L149)_

### tryGetAssetDocumentId

▸ **tryGetAssetDocumentId**(`src`: unknown): _string | undefined_

Tries to resolve the asset document ID from any inferrable structure

| Name  | Type    | Description                                                       |
| ----- | ------- | ----------------------------------------------------------------- |
| `src` | unknown | Input source (image/file object, asset, reference, id, url, path) |

**Returns:** _string | undefined_

_Defined in [src/resolve.ts:367](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L367)_

### tryGetAssetPath

▸ **tryGetAssetPath**(`src`: [SanityAssetSource](https://sanity-io.github.io/asset-utils/types/SanityAssetSource.html)): _string | undefined_

Tries to get the asset path from a given asset source

| Name  | Type                                                                                      | Description                                  |
| ----- | ----------------------------------------------------------------------------------------- | -------------------------------------------- |
| `src` | [SanityAssetSource](https://sanity-io.github.io/asset-utils/types/SanityAssetSource.html) | The source image to infer an asset path from |

**Returns:** _string | undefined_

_Defined in [src/paths.ts:125](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L125)_

### tryGetExtension

▸ **tryGetExtension**(`src`: [SanityAssetSource](https://sanity-io.github.io/asset-utils/types/SanityAssetSource.html)): _string | undefined_

Returns the file extension for a given asset

| Name  | Type                                                                                      | Description                                                       |
| ----- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `src` | [SanityAssetSource](https://sanity-io.github.io/asset-utils/types/SanityAssetSource.html) | Input source (file/image object, asset, reference, id, url, path) |

**Returns:** _string | undefined_

_Defined in [src/resolve.ts:110](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L110)_

### tryGetFile

▸ **tryGetFile**(`src`: [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html), `project`?: [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)): _[ResolvedSanityFile](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityFile.html) | undefined_

Tries to resolve an file object with as much information as possible, from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                                                                 | Description                                                 |
| --------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `src`     | [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html)              | Input source (file object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | (_Optional_) Project ID and dataset the file belongs to     |

**Returns:** _[ResolvedSanityFile](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityFile.html) | undefined_

_Defined in [src/resolve.ts:260](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L260)_

### tryGetFileAsset

▸ **tryGetFileAsset**(`src`: [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html), `options`?: [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html)): _[SanityFileAsset](https://sanity-io.github.io/asset-utils/types/SanityFileAsset.html) | undefined_

Tries to resolve a (partial) file asset document with as much information as possible, from any inferrable structure (id, url, path, file object etc)

| Name      | Type                                                                                             | Description                                                                       |
| --------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `src`     | [SanityFileSource](https://sanity-io.github.io/asset-utils/types/SanityFileSource.html)          | Input source (file object, asset, reference, id, url, path)                       |
| `options` | [PathBuilderOptions](https://sanity-io.github.io/asset-utils/interfaces/PathBuilderOptions.html) | (_Optional_) Project ID and dataset the file belongs to, along with other options |

**Returns:** _[SanityFileAsset](https://sanity-io.github.io/asset-utils/types/SanityFileAsset.html) | undefined_

_Defined in [src/resolve.ts:319](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L319)_

### tryGetIdFromString

▸ **tryGetIdFromString**(`str`: string): _string | undefined_

Tries to cooerce a string (ID, URL or path) to an image asset ID

| Name  | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| `str` | string | Input string (ID, URL or path) |

**Returns:** _string | undefined_

_Defined in [src/resolve.ts:417](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L417)_

### tryGetImage

▸ **tryGetImage**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html), `project`?: [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)): _[ResolvedSanityImage](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityImage.html) | undefined_

Tries to resolve an image object with as much information as possible, from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                                                                 | Description                                                  |
| --------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)            | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | (_Optional_) Project ID and dataset the image belongs to     |

**Returns:** _[ResolvedSanityImage](https://sanity-io.github.io/asset-utils/interfaces/ResolvedSanityImage.html) | undefined_

_Defined in [src/resolve.ts:164](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L164)_

### tryGetImageAsset

▸ **tryGetImageAsset**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html), `project`?: [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html)): _[SanityImageAsset](https://sanity-io.github.io/asset-utils/types/SanityImageAsset.html) | undefined_

Tries to resolve a (partial) image asset document with as much information as possible, from any inferrable structure (id, url, path, image object etc)

| Name      | Type                                                                                                 | Description                                                  |
| --------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src`     | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)            | Input source (image object, asset, reference, id, url, path) |
| `project` | [SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | (_Optional_) Project ID and dataset the image belongs to     |

**Returns:** _[SanityImageAsset](https://sanity-io.github.io/asset-utils/types/SanityImageAsset.html) | undefined_

_Defined in [src/resolve.ts:219](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L219)_

### tryGetImageDimensions

▸ **tryGetImageDimensions**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)): _[SanityImageDimensions](https://sanity-io.github.io/asset-utils/types/SanityImageDimensions.html) | undefined_

Returns the width, height and aspect ratio of a passed image asset, from any inferrable structure (id, url, path, asset document, image object etc)

| Name  | Type                                                                                      | Description                                                  |
| ----- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src` | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html) | Input source (image object, asset, reference, id, url, path) |

**Returns:** _[SanityImageDimensions](https://sanity-io.github.io/asset-utils/types/SanityImageDimensions.html) | undefined_

_Defined in [src/resolve.ts:81](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L81)_

### tryGetProject

▸ **tryGetProject**(`src`: [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html)): _[SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | undefined_

Resolves project ID and dataset the image belongs to, based on full URL or path

| Name  | Type                                                                                      | Description       |
| ----- | ----------------------------------------------------------------------------------------- | ----------------- |
| `src` | [SanityImageSource](https://sanity-io.github.io/asset-utils/types/SanityImageSource.html) | Image URL or path |

**Returns:** _[SanityProjectDetails](https://sanity-io.github.io/asset-utils/interfaces/SanityProjectDetails.html) | undefined_

_Defined in [src/resolve.ts:461](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/resolve.ts#L461)_

### tryGetUrlFilename

▸ **tryGetUrlFilename**(`url`: string): _string | undefined_

Strips the CDN URL, path and query params from a URL, eg: `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` → `filename-200x200.jpg`

| Name  | Type   | Description              |
| ----- | ------ | ------------------------ |
| `url` | string | URL to get filename from |

**Returns:** _string | undefined_

_Defined in [src/paths.ts:204](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L204)_

### tryGetUrlPath

▸ **tryGetUrlPath**(`url`: string): _string | undefined_

Strips the CDN URL and query params from a URL, eg: `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` → `images/project/dataset/filename-200x200.jpg`

| Name  | Type   | Description               |
| ----- | ------ | ------------------------- |
| `url` | string | URL to get path name from |

**Returns:** _string | undefined_

_Defined in [src/paths.ts:177](https://github.com/sanity-io/asset-utils/blob/v2.3.0/src/paths.ts#L177)_

## License

MIT-licensed. See LICENSE.
