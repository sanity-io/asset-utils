import {parseImageAssetId, parseFileAssetId, isValidFilename} from './parse'
import {
  ArgumentTypes,
  FileUrlBuilderOptions,
  ImageUrlBuilderOptions,
  isAssetIdStub,
  isAssetObjectStub,
  isAssetPathStub,
  isAssetUrlStub,
  isFileSource,
  isReference,
  isUnresolvableError,
  MethodReturnType,
  ResolvedSanityFile,
  ResolvedSanityImage,
  SanityAssetSource,
  SanityFileAsset,
  SanityFileObjectStub,
  SanityFileSource,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageObjectStub,
  SanityImageSource,
  SanityProjectDetails,
  UnresolvableError,
} from './types'
import {
  fileAssetFilenamePattern,
  idPattern,
  imageAssetFilenamePattern,
  pathPattern,
} from './patterns'

// For use in cases where the project and dataset doesn't really matter
const dummyProject = {projectId: 'a', dataset: 'b'}
const cdnUrl = 'https://cdn.sanity.io'

/**
 * Default crop (equals to "whole image")
 */
export const DEFAULT_CROP: Readonly<SanityImageCrop> = Object.freeze({
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
})

/**
 * Default hotspot (equals to horizontal/vertical center, full size of image)
 */
export const DEFAULT_HOTSPOT: Readonly<SanityImageHotspot> = Object.freeze({
  x: 0.5,
  y: 0.5,
  height: 1,
  width: 1,
})

/**
 * Returns cloned version of the default crop (prevents accidental mutations)
 *
 * @returns Default image crop object
 */
const getDefaultCrop = (): SanityImageCrop => ({...DEFAULT_CROP})

/**
 * Returns cloned version of the default hotspot (prevents accidental mutations)
 *
 * @returns Default image hotspot object
 */
const getDefaultHotspot = (): SanityImageHotspot => ({...DEFAULT_HOTSPOT})

/**
 * Returns the width, height and aspect ratio of a passed image asset, from any
 * inferrable structure (id, url, path, asset document, image object etc)
 *
 * @param src - Input source (image object, asset, reference, id, url, path)
 * @returns Object with width, height and aspect ratio properties
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed image source could not be resolved to an asset ID
 */
export function getImageDimensions(src: SanityImageSource): SanityImageDimensions {
  const imageId = getAssetDocumentId(src)
  const {width, height} = parseImageAssetId(imageId)
  const aspectRatio = width / height
  return {width, height, aspectRatio}
}

/**
 * See {@link getImageDimensions}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetImageDimensions = getForgivingResolver(getImageDimensions)

/**
 * Returns the file extension for a given asset
 *
 * @param src - Input source (file/image object, asset, reference, id, url, path)
 * @returns The file extension, if resolvable (no `.` included)
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed asset source could not be resolved to an asset ID
 */
export function getExtension(src: SanityAssetSource): string {
  return isFileSource(src)
    ? getFile(src, dummyProject).asset.extension
    : getImage(src, dummyProject).asset.extension
}

/**
 * See {@link getExtension}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetExtension = getForgivingResolver(getExtension)

/**
 * Tries to resolve an image object with as much information as possible,
 * from any inferrable structure (id, url, path, image object etc)
 *
 * @param src - Input source (image object, asset, reference, id, url, path)
 * @param project Project ID and dataset the image belongs to
 * @returns Image object
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed image source could not be resolved to an asset ID
 */
export function getImage(
  src: SanityImageSource,
  project?: SanityProjectDetails
): ResolvedSanityImage {
  const projectDetails = project || tryGetProject(src)
  const asset = getImageAsset(src, projectDetails)

  const img = src as SanityImageObjectStub
  return {
    asset,
    crop: img.crop || getDefaultCrop(),
    hotspot: img.hotspot || getDefaultHotspot(),
  }
}

/**
 * See {@link getImage}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetImage = getForgivingResolver(getImage)

/**
 * Tries to resolve a (partial) image asset document with as much information as possible,
 * from any inferrable structure (id, url, path, image object etc)
 *
 * @param src - Input source (image object, asset, reference, id, url, path)
 * @param project - Project ID and dataset the image belongs to
 * @returns Image asset document
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed image source could not be resolved to an asset ID
 */
export function getImageAsset(
  src: SanityImageSource,
  project?: SanityProjectDetails
): SanityImageAsset {
  const projectDetails = project || getProject(src)

  const _id = getAssetDocumentId(src)
  const sourceObj = src as SanityImageObjectStub
  const source = (sourceObj.asset || src) as SanityImageAsset
  const metadata = source.metadata || {}
  const {assetId, width, height, extension} = parseImageAssetId(_id)
  const aspectRatio = width / height
  const baseAsset: SanityImageAsset = {
    _id,
    _type: 'sanity.imageAsset',
    assetId,
    extension,
    metadata: {
      dimensions: {width, height, aspectRatio},
      ...metadata,
    },

    // Placeholders, overwritten below
    url: '',
    path: '',
  }

  return {
    ...baseAsset,
    path: buildImagePath(baseAsset, projectDetails),
    url: buildImageUrl(baseAsset, projectDetails),
  }
}

/**
 * See {@link getImageAsset}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetImageAsset = getForgivingResolver(getImageAsset)

/**
 * Tries to resolve an file object with as much information as possible,
 * from any inferrable structure (id, url, path, file object etc)
 *
 * @param src - Input source (file object, asset, reference, id, url, path)
 * @param project Project ID and dataset the file belongs to
 * @returns File object
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed file source could not be resolved to an asset ID
 */
export function getFile(src: SanityFileSource, project?: SanityProjectDetails): ResolvedSanityFile {
  const projectDetails = project || tryGetProject(src)
  const asset = getFileAsset(src, projectDetails)
  return {asset}
}

/**
 * See {@link getFile}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetFile = getForgivingResolver(getFile)

/**
 * Tries to resolve a (partial) file asset document with as much information as possible,
 * from any inferrable structure (id, url, path, file object etc)
 *
 * @param src - Input source (file object, asset, reference, id, url, path)
 * @param project - Project ID and dataset the file belongs to
 * @returns File asset document
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed file source could not be resolved to an asset ID
 */
export function getFileAsset(
  src: SanityFileSource,
  project?: SanityProjectDetails
): SanityFileAsset {
  const projectDetails = project || getProject(src)

  const _id = getAssetDocumentId(src)
  const sourceObj = src as SanityFileObjectStub
  const source = (sourceObj.asset || src) as SanityFileAsset
  const {assetId, extension} = parseFileAssetId(_id)
  const baseAsset: SanityFileAsset = {
    _id,
    _type: 'sanity.fileAsset',
    assetId,
    extension,
    metadata: source.metadata || {},

    // Placeholders, overwritten below
    url: '',
    path: '',
  }

  return {
    ...baseAsset,
    path: buildFilePath(baseAsset, projectDetails),
    url: buildFileUrl(baseAsset, projectDetails),
  }
}

/**
 * See {@link getFileAsset}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetFileAsset = getForgivingResolver(getFileAsset)

/**
 * Tries to resolve the asset document ID from any inferrable structure
 *
 * @param src - Input source (image/file object, asset, reference, id, url, path)
 * @returns The asset document ID
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed asset source could not be resolved to an asset document ID
 */
export function getAssetDocumentId(src: SanityAssetSource): string {
  const source = isAssetObjectStub(src) ? src.asset : src

  let id = ''
  if (typeof source === 'string') {
    id = getIdFromString(source)
  } else if (isReference(source)) {
    id = source._ref
  } else if (isAssetIdStub(source)) {
    id = source._id
  } else if (isAssetPathStub(source)) {
    id = idFromUrl(`${cdnUrl}/${source.path}`)
  } else if (isAssetUrlStub(source)) {
    id = idFromUrl(source.url)
  }

  const hasId = id && idPattern.test(id)
  if (!hasId) {
    throw new UnresolvableError(src)
  }

  return id
}

/**
 * See {@link getAssetDoucmentId}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetAssetDocumentId = getForgivingResolver(getAssetDocumentId)

/**
 * Tries to cooerce a string (ID, URL or path) to an image asset ID
 *
 * @param str - Input string (ID, URL or path)
 * @returns string
 *
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed image source could not be resolved to an asset ID
 */
export function getIdFromString(str: string): string {
  if (idPattern.test(str)) {
    // Already an ID
    return str
  }

  if (str.indexOf(`${cdnUrl}/images`) === 0 || str.indexOf(`${cdnUrl}/files`) === 0) {
    // Full URL
    return idFromUrl(str)
  }

  if (pathPattern.test(str)) {
    // Path
    return idFromUrl(`${cdnUrl}/${str}`)
  }

  if (isFileAssetFilename(str)) {
    // Just a filename (projectId/dataset irrelevant: just need asset ID)
    return idFromUrl(`${cdnUrl}/files/a/b/${str}`)
  }

  if (isImageAssetFilename(str)) {
    // Just a filename (projectId/dataset irrelevant: just need asset ID)
    return idFromUrl(`${cdnUrl}/images/a/b/${str}`)
  }

  throw new UnresolvableError(str)
}

/**
 * See {@link getIdFromString}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetIdFromString = getForgivingResolver(getIdFromString)

/**
 * Converts from a full asset URL to just the asset document ID
 *
 * @param url - A full asset URL to convert
 * @returns string
 */
function idFromUrl(url: string): string {
  const path = getUrlPath(url)
  const [type, , , fileName] = path.split('/')
  const prefix = type.replace(/s$/, '')
  return `${prefix}-${fileName.replace(/\./g, '-')}`
}

/**
 * Builds the base image path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param project - Project ID and dataset the image belongs to
 * @return string
 */
export function buildImagePath(
  asset: ImageUrlBuilderOptions,
  project?: SanityProjectDetails
): string {
  if (!project) {
    throw new Error('Project details (projectId and dataset) required to resolve path for image')
  }

  const {projectId, dataset} = project
  const {assetId, extension, metadata} = asset
  const {width, height} = metadata.dimensions

  return `images/${projectId}/${dataset}/${assetId}-${width}x${height}.${extension}`
}

/**
 * Builds the base image URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param project - Project ID and dataset the image belongs to
 * @return string
 */
export function buildImageUrl(
  asset: ImageUrlBuilderOptions,
  project?: SanityProjectDetails
): string {
  return `${cdnUrl}/${buildImagePath(asset, project)}`
}

/**
 * Builds the base file path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param project - Project ID and dataset the file belongs to
 * @return string
 */
export function buildFilePath(
  asset: FileUrlBuilderOptions,
  project?: SanityProjectDetails
): string {
  if (!project) {
    throw new Error('Project details (projectId and dataset) required to resolve path for file')
  }

  const {projectId, dataset} = project
  const {assetId, extension} = asset

  return `files/${projectId}/${dataset}/${assetId}.${extension}`
}

/**
 * Builds the base file URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID and extension
 * @param project - Project ID and dataset the file belongs to
 * @return string
 */
export function buildFileUrl(asset: FileUrlBuilderOptions, project?: SanityProjectDetails): string {
  return `${cdnUrl}/${buildFilePath(asset, project)}`
}

/**
 * Resolves project ID and dataset the image belongs to, based on full URL or path
 * @param source - Image URL or path
 * @returns object | undefined
 *
 * @throws {@link UnresolvableAssetError}
 * Throws if passed image source could not be resolved to an asset ID
 */
export function getProject(src: SanityImageSource): SanityProjectDetails {
  const path = tryGetAssetPath(src)
  if (!path) {
    throw new UnresolvableError(src, 'Failed to resolve project ID and dataset from source')
  }

  const [, projectId, dataset] = path.match(pathPattern) || ([] as string[])
  if (!projectId || !dataset) {
    throw new UnresolvableError(src, 'Failed to resolve project ID and dataset from source')
  }

  return {projectId, dataset}
}

/**
 * Checks whether or not the given URL contains an asset path
 *
 * @param url - URL or path name
 * @returns Whether or not it contained an asset path
 */
function hasPath(urlOrPath: string): boolean {
  return pathPattern.test(tryGetUrlPath(urlOrPath) || '')
}

/**
 * Tries to get the asset path from a given asset source
 *
 * @param src - The source image to infer an asset path from
 * @returns A path if resolvable, undefined otherwise
 */
function tryGetAssetPath(src: SanityAssetSource): string | undefined {
  if (isAssetObjectStub(src)) {
    return tryGetAssetPath(src.asset)
  }

  if (isReference(src)) {
    return undefined
  }

  if (typeof src === 'string') {
    return hasPath(src) ? getUrlPath(src) : undefined
  }

  if (isAssetPathStub(src)) {
    return src.path
  }

  if (isAssetUrlStub(src)) {
    return getUrlPath(src.url)
  }

  return undefined
}

/**
 * Strips the CDN URL and query params from a URL, eg:
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
 * `images/project/dataset/filename-200x200.jpg`
 *
 * @param url - URL to get path name from
 * @returns The path of a CDN URL
 * @throws If URL is not a valid Sanity asset URL
 */
export function getUrlPath(url: string): string {
  if (pathPattern.test(url)) {
    // Already just a path
    return url
  }

  if (!url.startsWith(`${cdnUrl}/`)) {
    throw new UnresolvableError(`Failed to resolve path from URL "${url}"`)
  }

  const qsPos = url.indexOf('?')
  const toIndex = qsPos === -1 ? undefined : qsPos
  return url.slice(cdnUrl.length + 1, toIndex)
}

/**
 * See {@link getUrlPath}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetUrlPath = getForgivingResolver(getUrlPath)

/**
 * Strips the CDN URL, path and query params from a URL, eg:
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
 * `filename-200x200.jpg`
 *
 * @param url - URL to get filename from
 * @returns The filename of an URL, if URL matches the CDN URL
 * @throws If URL is not a valid Sanity asset URL
 */
export function getUrlFilename(url: string): string {
  const path = tryGetUrlPath(url) || url
  const filename = path.replace(/^(images|files)\/[a-z0-9]+\/[a-z0-9][-\w]\/*/, '')
  if (!isValidFilename(filename)) {
    throw new UnresolvableError(`Failed to resolve filename from URL "${url}"`)
  }

  return filename
}

/**
 * See {@link getUrlFilename}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetUrlFilename = getForgivingResolver(getUrlFilename)

/**
 * See {@link getProject}
 *
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetProject = getForgivingResolver(getProject)

/**
 * Returns whether or not the passed filename is a valid image asset filename
 *
 * @param filename - Filename to validate
 * @returns Whether or not the filename is an image asset filename
 */
export function isImageAssetFilename(filename: string): boolean {
  return imageAssetFilenamePattern.test(filename)
}

/**
 * Returns whether or not the passed filename is a valid file asset filename
 *
 * @param filename - Filename to validate
 * @returns Whether or not the filename is a file asset filename
 */
export function isFileAssetFilename(filename: string): boolean {
  return fileAssetFilenamePattern.test(filename)
}

/**
 * Returns whether or not the passed filename is a valid file or image asset filename
 *
 * @param filename - Filename to validate
 * @returns Whether or not the filename is an asset filename
 */
export function isAssetFilename(filename: string): boolean {
  return isImageAssetFilename(filename) || isFileAssetFilename(filename)
}

/**
 * Returns a getter which returns `undefined` instead of throwing,
 * if encountering an `UnresolvableAssetError`
 *
 * @param method - Function to use as resolver
 * @returns Function that returns `undefined` if passed resolver throws UnresolvableAssetError
 */
function getForgivingResolver<T extends Function>(method: T) {
  return function (...args: ArgumentTypes<T>): MethodReturnType<T> | undefined {
    try {
      return method(...args)
    } catch (err) {
      if (isUnresolvableError(err)) {
        return undefined
      }

      throw err
    }
  }
}
