import {parseAssetUrl} from './parse'

/**
 * Checks whether or not a given URL is a valid Sanity asset URL
 *
 * @param url URL to test
 * @returns True if url is a valid Sanity asset URL, false otherwise
 */
export function isSanityAssetUrl(url: string): boolean {
  return getAssetUrlType(url) !== false
}

/**
 * Checks whether or not a given URL is a valid Sanity image asset URL
 *
 * @param url URL to test
 * @returns True if url is a valid Sanity image asset URL, false otherwise
 */
export function isSanityImageUrl(url: string): boolean {
  return getAssetUrlType(url) === 'image'
}

/**
 * Checks whether or not a given URL is a valid Sanity file asset URL
 *
 * @param url URL to test
 * @returns True if url is a valid Sanity file asset URL, false otherwise
 */
export function isSanityFileUrl(url: string): boolean {
  return getAssetUrlType(url) === 'file'
}

/**
 * Validates that a given URL is a Sanity asset URL, and returns the asset type if valid.
 *
 * @param url URL to extract asset type from
 * @returns Asset type if valid URL, false otherwise
 * @internal
 */
function getAssetUrlType(url: string): 'image' | 'file' | false {
  try {
    return parseAssetUrl(url).type
  } catch (err) {
    return false
  }
}
