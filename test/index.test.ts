import * as exported from '../src'

test('index: provides all exports', () => {
  expect(Object.keys(exported)).toContain('getImage')
})
