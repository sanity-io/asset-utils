import {DEFAULT_CROP, DEFAULT_HOTSPOT} from '../src/hotspotCrop'

export const projectId = 'abc123'
export const dataset = 'blog'
export const id = 'image-734d6889e614ff0c6788105c88cfe071aa3146e5-4240x2832-jpg'
export const lqip =
  // eslint-disable-next-line max-len
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwAFCP/EACoQAAEDAwEFCQEAAAAAAAAAAAECAwQABQYRBxIhMUEIExUjJDJhcXKh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABoRAAICAwAAAAAAAAAAAAAAAAABAhIRIjH/2gAMAwEAAhEDEQA/ANvHsTzJNmkpvs5ttp1B7wOH2j7oDXfRYsrc9c7LituKQrdVzT8V1VtMwNy5W65y3MguSBzQylXloB6adaO8c7P9jnxG5c65SnCRvFCUBIP9oVS4OzYfq2i2XXhGlEfoVUzt7IcRaQEeHhW7w1UTqaqGIi2P/9k='
export const ref = {_ref: id}
export const asset = {_id: id}
export const image = {asset: ref}
export const path = 'images/abc123/blog/734d6889e614ff0c6788105c88cfe071aa3146e5-4240x2832.jpg'
export const url =
  'https://cdn.sanity.io/images/abc123/blog/734d6889e614ff0c6788105c88cfe071aa3146e5-4240x2832.jpg'

export const urlWithQuery =
  'https://cdn.sanity.io/images/abc123/blog/734d6889e614ff0c6788105c88cfe071aa3146e5-4240x2832.jpg?w=320&h=240'

export const urlWithCustomFilename =
  'https://cdn.sanity.io/images/abc123/blog/734d6889e614ff0c6788105c88cfe071aa3146e5-4240x2832.jpg/kokos.jpg'

export const urlWithCustomFilenameAndQuery =
  'https://cdn.sanity.io/images/abc123/blog/734d6889e614ff0c6788105c88cfe071aa3146e5-4240x2832.jpg/kokos.jpg?w=320&h=240'

export const crop = {
  _type: 'sanity.imageCrop',
  bottom: 0.03748125937031466,
  left: 0.2,
  right: 0,
  top: 0,
}

export const hotspot = {
  _type: 'sanity.imageHotspot',
  height: 0.6042441207142097,
  width: 0.4084778420038537,
  x: 0.5722543352601153,
  y: 0.3194544346323949,
}

export const cropHotspotImage = {
  asset: ref,
  crop,
  hotspot,
}

export const resolvedCropHotspotImage = {
  asset,
  crop,
  hotspot,
}

export const palette = {
  _type: 'sanity.imagePalette',
  darkMuted: {
    _type: 'sanity.imagePaletteSwatch',
    background: '#4b433e',
    foreground: '#fff',
    population: 3.36,
    title: '#fff',
  },
  darkVibrant: {
    _type: 'sanity.imagePaletteSwatch',
    background: '#0c0c04',
    foreground: '#fff',
    population: 2.03,
    title: '#fff',
  },
  dominant: {
    _type: 'sanity.imagePaletteSwatch',
    background: '#7f7467',
    foreground: '#fff',
    population: 8.88,
    title: '#fff',
  },
  lightMuted: {
    _type: 'sanity.imagePaletteSwatch',
    background: '#d0c5b9',
    foreground: '#000',
    population: 6.41,
    title: '#fff',
  },
  lightVibrant: {
    _type: 'sanity.imagePaletteSwatch',
    background: '#f3f4fc',
    foreground: '#000',
    population: 2.6,
    title: '#000',
  },
  vibrant: {
    _type: 'sanity.imagePaletteSwatch',
    background: '#caa46b',
    foreground: '#000',
    population: 0.09,
    title: '#fff',
  },
}

export const assetWithMeta = {
  ...asset,
  metadata: {dimensions: {width: 4240, height: 2832, aspectRatio: 4240 / 2832}, lqip, palette},
}

export const resolvedCropHotspotImageWithMeta = {
  asset: assetWithMeta,
  crop,
  hotspot,
}

export const resolvedImageWithMeta = {
  asset: assetWithMeta,
}

export const resolvedNoopCropImageWithMeta = {
  asset: assetWithMeta,
  crop: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
}

export const portraitImage = {
  asset: {_id: 'image-734d6889e614ff0c6788105c88cfe071aa3146e5-2832x4240-jpg'},
}

export const portraitCropHotspotImage = {
  asset: {
    _id: 'image-734d6889e614ff0c6788105c88cfe071aa3146e5-2832x4240-jpg',
    path,
  },
  crop: {
    _type: 'sanity.imageCrop',
    bottom: 0,
    left: 0.03748125937031466,
    right: 0,
    top: 0.2,
  },
  hotspot: {
    _type: 'sanity.imageHotspot',
    height: 0.4084778420038537,
    width: 0.6042441207142097,
    y: 0.5722543352601153,
    x: 0.3194544346323949,
  },
}

export const expectedAsset = {
  _id: 'image-f00baa-320x240-png',
  _type: 'sanity.imageAsset',
  assetId: 'f00baa',
  extension: 'png',
  path: 'images/a/b/f00baa-320x240.png',
  url: 'https://cdn.sanity.io/images/a/b/f00baa-320x240.png',
  metadata: {
    dimensions: {
      width: 320,
      height: 240,
      aspectRatio: 320 / 240,
    },
  },
}

export const expectedImage = {
  asset: expectedAsset,
  crop: DEFAULT_CROP,
  hotspot: DEFAULT_HOTSPOT,
}

export const customHotspot = {
  _type: 'sanity.imageHotspot',
  height: 0.4084778420038537,
  width: 0.6042441207142097,
  y: 0.5722543352601153,
  x: 0.3194544346323949,
}

export const customCrop = {
  _type: 'sanity.imageCrop',
  bottom: 0,
  left: 0.03748125937031466,
  right: 0,
  top: 0.2,
}

export const testProject = {
  projectId: 'a',
  dataset: 'b',
}
