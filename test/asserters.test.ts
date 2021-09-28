import {isSanityAssetUrl, isSanityFileUrl, isSanityImageUrl} from '../src'

// isSanityAssetUrl()
test('isSanityAssetUrl(): returns true for image urls', () => {
  expect(
    isSanityAssetUrl(
      'https://cdn.sanity.io/images/espenhov/diary/756e4bd9c0a04ada3d3cc396cf81f1c433b07870-5760x3840.jpg'
    )
  ).toBe(true)
})

test('isSanityAssetUrl(): returns true for file urls', () => {
  expect(
    isSanityAssetUrl(
      'https://cdn.sanity.io/files/espenhov/diary/756e4bd9c0a04ada3d3cc396cf81f1c433b07870.pdf'
    )
  ).toBe(true)
})

test('isSanityAssetUrl(): returns false for invalid urls', () => {
  expect(isSanityAssetUrl('https://cdn.not.sanity/rottifnatti/lol.jpg')).toBe(false)
})

// isSanityFileUrl
test('isSanityFileUrl(): returns false for image urls', () => {
  expect(
    isSanityFileUrl(
      'https://cdn.sanity.io/images/espenhov/diary/756e4bd9c0a04ada3d3cc396cf81f1c433b07870-5760x3840.jpg'
    )
  ).toBe(false)
})

test('isSanityFileUrl(): returns true for file urls', () => {
  expect(
    isSanityFileUrl(
      'https://cdn.sanity.io/files/espenhov/diary/756e4bd9c0a04ada3d3cc396cf81f1c433b07870.pdf'
    )
  ).toBe(true)
})

test('isSanityFileUrl(): returns false for invalid urls', () => {
  expect(isSanityFileUrl('https://cdn.not.sanity/rottifnatti/lol.jpg')).toBe(false)
})

// isSanityImageUrl
test('isSanityImageUrl(): returns true for image urls', () => {
  expect(
    isSanityImageUrl(
      'https://cdn.sanity.io/images/espenhov/diary/756e4bd9c0a04ada3d3cc396cf81f1c433b07870-5760x3840.jpg'
    )
  ).toBe(true)
})

test('isSanityImageUrl(): returns false for file urls', () => {
  expect(
    isSanityImageUrl(
      'https://cdn.sanity.io/files/espenhov/diary/756e4bd9c0a04ada3d3cc396cf81f1c433b07870.pdf'
    )
  ).toBe(false)
})

test('isSanityImageUrl(): returns false for invalid urls', () => {
  expect(isSanityImageUrl('https://cdn.not.sanity/rottifnatti/lol.jpg')).toBe(false)
})
