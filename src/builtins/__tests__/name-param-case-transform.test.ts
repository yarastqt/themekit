import type { Token } from '../../types'
import { transformNameToParamcase } from '../name-param-case-transform'

describe('transformNameToParamcase', () => {
  test('should return name with kebab-case', () => {
    const result = transformNameToParamcase.transformer({
      token: { path: ['token1', 'group', 'nestedPath'] } as Token,
    })
    expect(result).toBe('token1-group-nested-path')
  })
})
