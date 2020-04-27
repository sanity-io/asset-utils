import {getAssetDocumentId} from './resolve'

export type SanityAssetIdParts = SanityFileAssetIdParts | SanityImageAssetIdParts

export interface SanityFileAssetIdParts {
  type: 'file'
  assetId: string
  extension: string
}

export type SanityImageAssetIdParts = {
  type: 'image'
  assetId: string
  extension: string
  width: number
  height: number
}

export type SanityAssetSource = SanityFileSource | SanityImageSource

export type SanityFileSource =
  | string
  | SanityReference
  | SanityFileAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityFileObjectStub

export type SanityImageSource =
  | string
  | SanityReference
  | SanityImageAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityImageObjectStub

export function isFileSource(src: SanityAssetSource): src is SanityFileSource {
  const assetId = getAssetDocumentId(src)
  return assetId.startsWith('file-')
}

export function isImageSource(src: SanityAssetSource): src is SanityImageSource {
  const assetId = getAssetDocumentId(src)
  return assetId.startsWith('image-')
}

export type SanitySwatchName =
  | 'darkMuted'
  | 'darkVibrant'
  | 'dominant'
  | 'lightMuted'
  | 'lightVibrant'
  | 'muted'
  | 'vibrant'

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface AbsoluteRectangle {
  top: number
  left: number
  right: number
  bottom: number
}

export interface SanityProjectDetails {
  projectId: string
  dataset: string
}

export interface ImageUrlBuilderOptions {
  assetId: string
  extension: string
  metadata: {
    dimensions: {
      width: number
      height: number
    }
  }
}

export interface FileUrlBuilderOptions {
  assetId: string
  extension: string
}

export interface SanityReference {
  _ref: string
  _weak?: boolean
}

export function isReference(ref: unknown): ref is SanityReference {
  return isObject(ref) && typeof (ref as SanityReference)._ref === 'string'
}

export interface SanityAssetIdStub {
  _id: string
}

export function isAssetIdStub(stub: unknown): stub is SanityAssetIdStub {
  return isObject(stub) && typeof (stub as SanityAssetIdStub)._id === 'string'
}

export interface SanityAssetPathStub {
  path: string
}

export function isAssetPathStub(stub: unknown): stub is SanityAssetPathStub {
  return isObject(stub) && typeof (stub as SanityAssetPathStub).path === 'string'
}

export interface SanityAssetUrlStub {
  url: string
}

export function isAssetUrlStub(stub: unknown): stub is SanityAssetUrlStub {
  return isObject(stub) && typeof (stub as SanityAssetUrlStub).url === 'string'
}

export interface SanityAsset {
  _id: string
  _type: string
  url: string
  path: string
  assetId: string
  extension: string
  originalFilename?: string
}

export type SanityImageAsset = SanityAsset & {
  _type: 'sanity.imageAsset'
  metadata: SanityImageMetadata
}

export type SanityFileAsset = SanityAsset & {
  _type: 'sanity.fileAsset'
  metadata: {[key: string]: unknown}
}

export function isSanityFileAsset(src: unknown): src is SanityFileAsset {
  return isObject(src) && (src as SanityFileAsset)._type === 'sanity.fileAsset'
}

export interface SanityImageMetadata {
  dimensions: SanityImageDimensions
  lqip?: string
  palette?: SanityImagePalette
  [key: string]: unknown
}

export interface SanityImageSize {
  height: number
  width: number
}

export type SanityImageDimensions = SanityImageSize & {
  aspectRatio: number
}

export interface SanityImageCrop {
  _type?: string
  left: number
  bottom: number
  right: number
  top: number
}

export interface SanityImageHotspot {
  _type?: string
  width: number
  height: number
  x: number
  y: number
}

export interface SanityFileObjectStub {
  _type?: string
  asset:
    | SanityReference
    | SanityFileAsset
    | SanityAssetIdStub
    | SanityAssetPathStub
    | SanityAssetUrlStub
  [key: string]: unknown
}

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

export interface ResolvedSanityImage {
  _type?: string
  asset: SanityImageAsset
  crop: SanityImageCrop
  hotspot: SanityImageHotspot
  [key: string]: unknown
}

export interface ResolvedSanityFile {
  _type?: string
  asset: SanityFileAsset
  [key: string]: unknown
}

export type SanityAssetObjectStub = SanityFileObjectStub | SanityImageObjectStub

export function isAssetObjectStub(stub: unknown): stub is SanityAssetObjectStub {
  const item = stub as SanityAssetObjectStub
  return item && typeof item === 'object' && item.asset && typeof item.asset === 'object'
}

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

export interface SanityImageSwatch {
  background: string
  foreground: string
  population: number
  title?: string
}

export interface SanityImageFitResult {
  width?: number
  height?: number
  rect: Rectangle
}

export class UnresolvableError extends Error {
  unresolvable = true
  input?: SanityAssetSource

  constructor(inputSource: SanityAssetSource, message = 'Failed to resolve asset ID from source') {
    super(message)
    this.input = inputSource
  }
}

export function isUnresolvableError(err: Error): err is UnresolvableError {
  const error = err as UnresolvableError
  return Boolean(error.input && error.unresolvable)
}

export function isObject(obj: unknown): obj is object {
  return obj !== null && typeof obj === 'object'
}

// TypeScript helpers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MethodReturnType<T> = T extends (...args: unknown[]) => infer R ? R : any
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown ? A : never
