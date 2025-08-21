/**
 * @internal
 */
export const cdnUrl = 'https://cdn.sanity.io'

/**
 * @internal
 */
export const cdnUrlPattern = /^https:\/\/cdn\.sanity\./

/**
 * @internal
 */
export const customCdnUrlPattern =
  /^https:\/\/cdn\.[^/]+\/(images|files)\/[^/]+\/.*?[a-zA-Z0-9_]{24,40}.*$/

/**
 * @internal
 */
export const fileAssetFilenamePattern = /^([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+\.[a-z0-9]+$/

/**
 * @internal
 */
export const fileAssetIdPattern = /^file-([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-[a-z0-9]+$/

/**
 * @internal
 */
export const imageAssetFilenamePattern = /^([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})-\d+x\d+\.[a-z0-9]+$/

/**
 * @internal
 */
export const imageAssetIdPattern = /^image-([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-\d+x\d+-[a-z0-9]+$/

/**
 * @internal
 */
export const assetFilenamePattern =
  /^(([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+|([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-\d+x\d+\.[a-z0-9]+)$/

/**
 * @internal
 */
export const pathPattern = /^(images|files)\/([a-z0-9]+)\/([a-z0-9][-\w]*)\//

/**
 * @internal
 */
export const idPattern =
  /^(?:image-(?:[a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-\d+x\d+-[a-z0-9]+|file-(?:[a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-[a-z0-9]+)$/

/**
 * Asset type for image assets
 * @internal
 */
export const imageAssetType = 'sanity.imageAsset'

/**
 * Asset type for file assets
 * @internal
 */
export const fileAssetType = 'sanity.fileAsset'

/**
 * For use in cases where the project and dataset doesn't really matter
 *
 * @internal
 */
export const dummyProject = {projectId: 'a', dataset: 'b'}

/**
 * Placeholder asset _ids for in-progress uploads
 * @internal
 */
export const inProgressAssetId = 'upload-in-progress-placeholder'

/**
 * Placeholder assetId for in-progress uploads
 * @internal
 */
export const inProgressAssetAssetId = 'upload-in-progress'

/**
 * Placeholder extension for in-progress uploads
 * @internal
 */
export const inProgressAssetExtension = 'tmp'
