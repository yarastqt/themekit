import { resolve } from 'path'

import { readFile } from '../file-reader'

describe('file-reader', () => {
  test('should read json file', () => {
    const content = readFile(resolve(__dirname, './fixtures/tokens.json'))
    expect(content).toMatchObject({ token: 'value' })
  })

  test('should read yaml file', () => {
    const yaml = readFile(resolve(__dirname, './fixtures/tokens.yaml'))
    expect(yaml).toMatchObject({ token: 'value' })
    const yml = readFile(resolve(__dirname, './fixtures/tokens.yml'))
    expect(yml).toMatchObject({ token: 'value' })
  })
})
