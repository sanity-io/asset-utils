export const cdnUrl = 'https://cdn.sanity.io'

// Regex patterns
export const fileAssetFilenamePattern = /^[a-f0-9]+\.[a-z0-9]+$/
export const fileAssetIdPattern = /^file-[a-f0-9]+-[a-z0-9]+$/
export const imageAssetFilenamePattern = /^[a-f0-9]+-\d+x\d+\.[a-z0-9]+$/
export const imageAssetIdPattern = /^image-[a-f0-9]+-\d+x\d+-[a-z0-9]+$/
export const assetFilenamePattern = /^([a-f0-9]+\.[a-z0-9]+|[a-f0-9]+-\d+x\d+\.[a-z0-9]+)$/
export const pathPattern = /^(?:images|files)\/([a-z0-9]+)\/([a-z0-9][-\w]*)\//
export const idPattern = /^(?:image-[a-f0-9]+-\d+x\d+-[a-z0-9]+|file-[a-f0-9]+-[a-z0-9]+)$/

// For use in cases where the project and dataset doesn't really matter
export const dummyProject = {projectId: 'a', dataset: 'b'}
