import type { Token } from '../../types'
import { transformValueWithColorFn } from '../value-color-function-transform'

describe('value-color-function-transform', () => {
  test('should return value with compiled color', () => {
    const result = transformValueWithColorFn.transformer({
      token: { value: 'color(#000 a(10%))' } as Token,
    })
    expect(result).toBe('rgba(0, 0, 0, 0.1)')
  })
})
