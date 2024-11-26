import {
  isAssetObjectStub,
  isAssetPathStub,
  isAssetUrlStub,
  isCdnUrl,
  isReference,
} from './asserters.js'
import {
  cdnUrl,
  fileAssetFilenamePattern,
  imageAssetFilenamePattern,
  pathPattern,
} from './constants.js'
import {UnresolvableError} from './errors.js'
import type {
  FileUrlBuilderOptions,
  ImageUrlBuilderOptions,
  PathBuilderOptions,
  SanityAssetSource,
  SanityFileUrlParts,
  SanityImageUrlParts,
} from './types.js'
import {getForgivingResolver} from './utils.js'

/**
 * Builds the base image path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the image belongs to, along with other options
 * @returns The path to the image
 * @public
 */
export function buildImagePath(
  asset: ImageUrlBuilderOptions | SanityImageUrlParts,
  options?: PathBuilderOptions,
): string {
  const projectId = options?.projectId || asset.projectId
  const dataset = options?.dataset || asset.dataset
  if (!projectId || !dataset) {
    throw new Error('Project details (projectId and dataset) required to resolve path for image')
  }

  const dimensions =
    'metadata' in asset ? asset.metadata.dimensions : {width: asset.width, height: asset.height}
  const originalFilename = 'originalFilename' in asset ? asset.originalFilename : undefined
  const {assetId, extension, vanityFilename} = asset
  const {width, height} = dimensions
  const vanity = getVanityStub(originalFilename, vanityFilename, options)

  return `images/${projectId}/${dataset}/${assetId}-${width}x${height}.${extension}${vanity}`
}

/**
 * Builds the base image URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the image belongs to
 * @returns The URL to the image, as a string
 * @public
 */
export function buildImageUrl(
  asset: ImageUrlBuilderOptions | SanityImageUrlParts,
  options?: PathBuilderOptions,
): string {
  const baseUrl = options?.baseUrl || cdnUrl
  return `${baseUrl}/${buildImagePath(asset, options)}`
}

/**
 * Builds the base file path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the file belongs to, along with other options
 * @returns The path to the file
 * @public
 */
export function buildFilePath(
  asset: FileUrlBuilderOptions | SanityFileUrlParts,
  options?: PathBuilderOptions,
): string {
  const projectId = options?.projectId || asset.projectId
  const dataset = options?.dataset || asset.dataset
  if (!projectId || !dataset) {
    throw new Error('Project details (projectId and dataset) required to resolve path for file')
  }

  const originalFilename = 'originalFilename' in asset ? asset.originalFilename : undefined
  const {assetId, extension, vanityFilename} = asset
  const vanity = getVanityStub(originalFilename, vanityFilename, options)

  return `files/${projectId}/${dataset}/${assetId}.${extension}${vanity}`
}

/**
 * Builds the base file URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID and extension
 * @param options - Project ID and dataset the file belongs to, along with other options
 * @returns The URL to the file, as a string
 * @public
 */
export function buildFileUrl(asset: FileUrlBuilderOptions, options?: PathBuilderOptions): string {
  const baseUrl = options?.baseUrl || cdnUrl
  return `${baseUrl}/${buildFilePath(asset, options)}`
}

/**
 * Checks whether or not the given URL contains an asset path
 *
 * @param url - URL or path name
 * @returns Whether or not it contained an asset path
 * @public
 */
function hasPath(urlOrPath: string): boolean {
  return pathPattern.test(tryGetUrlPath(urlOrPath) || '')
}

/**
 * Tries to get the asset path from a given asset source
 *
 * @param src - The source image to infer an asset path from
 * @returns A path if resolvable, undefined otherwise
 * @public
 */
export function tryGetAssetPath(src: SanityAssetSource): string | undefined {
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
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` →
 * `images/project/dataset/filename-200x200.jpg`
 *
 * @param url - URL to get path name from
 * @returns The path of a CDN URL
 * @public
 * @throws If URL is not a valid Sanity asset URL
 */
export function getUrlPath(url: string): string {
  if (pathPattern.test(url)) {
    // Already just a path
    return url
  }

  if (!isCdnUrl(url)) {
    throw new UnresolvableError(`Failed to resolve path from URL "${url}"`)
  }

  return new URL(url).pathname.replace(/^\/+/, '')
}

/**
 * {@inheritDoc getUrlPath}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export const tryGetUrlPath = getForgivingResolver(getUrlPath)

/**
 * Strips the CDN URL, path and query params from a URL, eg:
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` →
 * `filename-200x200.jpg`
 *
 * @param url - URL to get filename from
 * @returns The filename of an URL, if URL matches the CDN URL
 * @public
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
 * {@inheritDoc getUrlFilename}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export const tryGetUrlFilename = getForgivingResolver(getUrlFilename)

/**
 * Checks whether or not a given filename matches the expected Sanity asset filename pattern
 *
 * @param filename - Filename to check for validity
 * @returns Whether or not the specified filename is valid
 * @public
 */
export function isValidFilename(filename: string): boolean {
  return fileAssetFilenamePattern.test(filename) || imageAssetFilenamePattern.test(filename)
}

/**
 * Get the "path stub" at the end of the path, if the user hasn't explicitly opted out of this behavior
 *
 * @param originalFilename - The original filename of the asset
 * @param vanityFilename - The vanity filename of the asset
 * @param options - Options to control the behavior of the path builder
 * @returns The vanity stub, if any
 * @public
 */
export function getVanityStub(
  originalFilename: string | undefined,
  vanityFilename: string | undefined,
  options?: PathBuilderOptions,
): string {
  const vanity = vanityFilename || originalFilename
  return options?.useVanityName === false || !vanity ? '' : `/${vanity}`
}
