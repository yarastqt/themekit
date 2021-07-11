import type { Token } from '../../types'
import { isValueColorFilter } from '../is-value-color-filter'

describe('is-value-color-filter', () => {
  test('should return true when value is color (hex)', () => {
    const hex = isValueColorFilter.matcher({
      token: { value: '#fff' } as Token,
    })
    expect(hex).toBeTruthy()
  })

  test('should return true when value is color (rgb)', () => {
    const rgb = isValueColorFilter.matcher({
      token: { value: 'rgb(0, 0, 0)' } as Token,
    })
    const rgba = isValueColorFilter.matcher({
      token: { value: 'rgba(0, 0, 0)' } as Token,
    })
    expect(rgb).toBeTruthy()
    expect(rgba).toBeTruthy()
  })

  test('should return true when value is color (hsl)', () => {
    const hsl = isValueColorFilter.matcher({
      token: { value: 'hsl(0, 100%, 50%)' } as Token,
    })
    const hsla = isValueColorFilter.matcher({
      token: { value: 'hsl(0, 100%, 50%, 0)' } as Token,
    })
    expect(hsl).toBeTruthy()
    expect(hsla).toBeTruthy()
  })

  test('should return true when value is color (transparent)', () => {
    const transparent = isValueColorFilter.matcher({
      token: { value: 'transparent' } as Token,
    })
    expect(transparent).toBeTruthy()
  })
})
