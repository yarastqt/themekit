import type { Token } from '../../types'
import { isValueNotColorFilter } from '../is-value-not-color-filter'

describe('is-value-not-color-filter', () => {
  test('should return true when value is not color', () => {
    const result = isValueNotColorFilter.matcher({
      token: { value: '1' } as Token,
    })
    expect(result).toBeTruthy()
  })
})
