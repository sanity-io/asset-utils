import {test, expect} from 'vitest'
import {
  DEFAULT_CROP,
  DEFAULT_HOTSPOT,
  isDefaultCrop,
  isDefaultHotspot,
  getDefaultHotspot,
  getDefaultCrop,
} from '../src/hotspotCrop.js'

// constants
test('constant DEFAULT_CROP matches expected value', () =>
  expect(DEFAULT_CROP).toEqual({left: 0, top: 0, bottom: 0, right: 0}))

test('constant DEFAULT_HOTSPOT matches expected value', () =>
  expect(DEFAULT_HOTSPOT).toEqual({
    x: 0.5,
    y: 0.5,
    height: 1,
    width: 1,
  }))

// functions
test('getDefaultCrop() matches (but not strictly) DEFAULT_CROP', () => {
  expect(getDefaultCrop()).not.toBe(DEFAULT_CROP)
  expect(getDefaultCrop()).toMatchObject(DEFAULT_CROP)
})

test('getDefaultHotspot() matches (but not strictly) DEFAULT_HOTSPOT', () => {
  expect(getDefaultHotspot()).not.toBe(DEFAULT_HOTSPOT)
  expect(getDefaultHotspot()).toMatchObject(DEFAULT_HOTSPOT)
})

test('isDefaultCrop() determines value correctly', () => {
  expect(isDefaultCrop(DEFAULT_CROP)).toBe(true)
  expect(isDefaultCrop(getDefaultCrop())).toBe(true)
  expect(isDefaultCrop({bottom: 0.1, top: 0.2, right: 0.3, left: 0.4})).toBe(false)
})

test('isDefaultHotspot() determines value correctly', () => {
  expect(isDefaultHotspot(DEFAULT_HOTSPOT)).toBe(true)
  expect(isDefaultHotspot(getDefaultHotspot())).toBe(true)
  expect(isDefaultHotspot({x: 0.1, y: 0.2, width: 0.5, height: 0.5})).toBe(false)
})
