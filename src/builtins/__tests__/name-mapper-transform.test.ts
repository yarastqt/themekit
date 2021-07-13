import type { Token } from '../../types'
import { transformNameWithMapper } from '../name-mapper-transform'

describe('name-mapper-transform', () => {
  test('should change name from mapper', () => {
    const result = transformNameWithMapper.transformer({
      token: { name: 'original' } as Token,
      context: {
        mapper: {
          original: 'changed',
        },
      },
    })
    expect(result).toBe('changed')
  })

  test('should not change name if not found in mapper', () => {
    const result = transformNameWithMapper.transformer({
      token: { name: 'original' } as Token,
      context: {
        mapper: {
          another: 'changed',
        },
      },
    })
    expect(result).toBe('original')
  })
})
