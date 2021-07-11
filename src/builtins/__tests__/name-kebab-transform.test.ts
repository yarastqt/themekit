import type { Token } from '../../types'
import { transformNameToKebabCase } from '../name-kebab-transform'

describe('name-kebab-transform', () => {
  test('should return name with kebab-case', () => {
    const result = transformNameToKebabCase.transformer({
      token: { path: ['token1', 'group', 'nestedPath'] } as Token,
    })
    expect(result).toBe('token1-group-nested-path')
  })
})
