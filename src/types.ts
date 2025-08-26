/**
 * @public
 */
export interface SanityProjectDetails {
  projectId: string
  dataset: string
  baseUrl?: string
}

/**
 * @public
 */
export interface PathBuilderOptions extends Partial<SanityProjectDetails> {
  useVanityName?: boolean
}

/**
 * @public
 */
export type SanityAssetIdParts = SanityFileAssetIdParts | SanityImageAssetIdParts

/**
 * @public
 */
export type SanityAssetUrlParts = SanityFileUrlParts | SanityImageUrlParts

/**
 * @public
 */
export interface SanityImageAssetIdParts {
  type: 'image'
  assetId: string
  extension: string
  width: number
  height: number
}

/**
 * @public
 */
export interface SanityImageUrlParts extends SanityProjectDetails, SanityImageAssetIdParts {
  vanityFilename?: string
}

/**
 * @public
 */
export interface ImageUrlBuilderOptions extends Partial<SanityProjectDetails> {
  assetId: string
  extension: string
  metadata: {
    dimensions: {
      width: number
      height: number
    }
  }

  /**
   * Alias of `vanityFilename` - prefers `vanityFilename` if both are set
   */
  originalFilename?: string

  /**
   * Alias of `originalFilename` - prefers `vanityFilename` if both are set
   */
  vanityFilename?: string
}

/**
 * @public
 */
export interface SanityFileAssetIdParts {
  type: 'file'
  assetId: string
  extension: string
}

/**
 * @public
 */
export interface SanityFileUrlParts extends SanityProjectDetails, SanityFileAssetIdParts {
  vanityFilename?: string
}

/**
 * @public
 */
export interface FileUrlBuilderOptions extends Partial<SanityProjectDetails> {
  assetId: string
  extension: string

  /**
   * Alias of `vanityFilename` - prefers `vanityFilename` if both are set
   */
  originalFilename?: string

  /**
   * Alias of `originalFilename` - prefers `vanityFilename` if both are set
   */
  vanityFilename?: string
}

/**
 * @public
 */
export type SanityAssetSource = SanityFileSource | SanityImageSource

/**
 * @public
 */
export type SanityFileSource =
  | string
  | SanityReference
  | SanityFileAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityFileObjectStub
  | SanityFileUploadStub

/**
 * @public
 */
export type SanityImageSource =
  | string
  | SanityReference
  | SanityImageAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityImageObjectStub
  | SanityImageUploadStub

/**
 * @public
 */
export type SanitySwatchName =
  | 'darkMuted'
  | 'darkVibrant'
  | 'dominant'
  | 'lightMuted'
  | 'lightVibrant'
  | 'muted'
  | 'vibrant'

/**
 * @public
 */
export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

/**
 * @public
 */
export interface AbsoluteRectangle {
  top: number
  left: number
  right: number
  bottom: number
}

/**
 * @public
 */
export interface SanityReference {
  _ref: string
  _weak?: boolean
}

/**
 * @public
 */
export interface SanityAssetIdStub {
  _id: string
}

/**
 * @public
 */
export interface SanityAssetPathStub {
  path: string
}

/**
 * @public
 */
export interface SanityAssetUrlStub {
  url: string
}

/**
 * @public
 */
export interface SanityAsset {
  _id: string
  _type: string
  url: string
  path: string
  assetId: string
  extension: string
  originalFilename?: string
}

/**
 * @public
 */
export type SanityImageAsset = SanityAsset & {
  _type: 'sanity.imageAsset'
  metadata: SanityImageMetadata
}

/**
 * @public
 */
export type SanityFileAsset = SanityAsset & {
  _type: 'sanity.fileAsset'
  metadata: {[key: string]: unknown}
}

/**
 * @public
 */
export interface SanityImageMetadata {
  dimensions: SanityImageDimensions
  lqip?: string
  blurHash?: string
  palette?: SanityImagePalette
  [key: string]: unknown
}

/**
 * @public
 */
export interface SanityImageSize {
  height: number
  width: number
}

/**
 * @public
 */
export type SanityImageDimensions = SanityImageSize & {
  aspectRatio: number
}

/**
 * @public
 */
export interface SanityImageCrop {
  _type?: string
  left: number
  bottom: number
  right: number
  top: number
}

/**
 * @public
 */
export interface SanityImageHotspot {
  _type?: string
  width: number
  height: number
  x: number
  y: number
}

/**
 * @public
 */
export interface SanityFileObjectStub {
  _type?: string
  asset:
    | SanityReference
    | SanityFileAsset
    | SanityAssetIdStub
    | SanityAssetPathStub
    | SanityAssetUrlStub
  _upload?: unknown // For in-progress uploads
  [key: string]: unknown
}

/**
 * @public
 */
export interface SanityImageObjectStub {
  _type?: string
  asset:
    | SanityReference
    | SanityImageAsset
    | SanityAssetIdStub
    | SanityAssetPathStub
    | SanityAssetUrlStub
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  [key: string]: unknown
}

/**
 * Represents an in-progress image upload (has upload property but no asset yet)
 * @public
 */
export interface SanityImageUploadStub {
  _type?: string
  _upload?: unknown
  asset?: SanityImageAsset
  [key: string]: unknown
}

/**
 * Represents an in-progress file upload (has upload property but no asset yet)
 * @public
 */
export interface SanityFileUploadStub {
  _type?: string
  _upload?: unknown
  asset?: SanityFileAsset
  [key: string]: unknown
}

/**
 * @public
 */
export interface ResolvedSanityImage {
  _type?: string
  asset: SanityImageAsset
  crop: SanityImageCrop
  hotspot: SanityImageHotspot
  [key: string]: unknown
}

/**
 * @public
 */
export interface ResolvedSanityFile {
  _type?: string
  asset: SanityFileAsset
  [key: string]: unknown
}

/**
 * @public
 */
export type SanityAssetObjectStub = SanityFileObjectStub | SanityImageObjectStub

/**
 * @public
 */
export interface SanityImagePalette {
  _type?: string
  darkMuted?: SanityImageSwatch
  darkVibrant?: SanityImageSwatch
  dominant?: SanityImageSwatch
  lightMuted?: SanityImageSwatch
  lightVibrant?: SanityImageSwatch
  muted?: SanityImageSwatch
  vibrant?: SanityImageSwatch
  [key: string]: unknown
}

/**
 * @public
 */
export interface SanityImageSwatch {
  background: string
  foreground: string
  population: number
  title?: string
}

/**
 * @public
 */
export interface SanityImageFitResult {
  width?: number
  height?: number
  rect: Rectangle
}

/**
 * A "safe function" is a wrapped function that would normally throw an UnresolvableError,
 * but will instead return `undefined`. Other errors are still thrown.
 *
 * @public
 */
export type SafeFunction<Args extends unknown[], Return> = (...args: Args) => Return | undefined
