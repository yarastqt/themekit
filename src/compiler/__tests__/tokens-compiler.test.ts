import { CircularRefsException, NotFoundRefException } from '../errors'
import { compileTokens } from '../tokens-compiler'

describe('tokens-compiler', () => {
  test('should return tokens with correct shape', () => {
    const tokens = [{ token1: { value: 'value-1', comment: 'comment-1' } }]
    const result = compileTokens(tokens)
    expect(result[0]).toHaveProperty('attributes')
    expect(result[0]).toHaveProperty('comment', 'comment-1')
    expect(result[0]).toHaveProperty('value', 'value-1')
    expect(result[0]).toHaveProperty('path', ['token1'])
    expect(result[0]).toHaveProperty('original.value', 'value-1')
  })

  test('should return flatten tokens', () => {
    const tokens = [{ token1: { token2: { token3: { value: 'value-3' } } } }]
    const result = compileTokens(tokens)
    expect(result[0]).toHaveProperty('path', ['token1', 'token2', 'token3'])
  })

  test('should return tokens with deep merged', () => {
    const tokens = [
      { token1: { value: 'value-1', comment: 'comment-1' } },
      { token1: { value: 'value-2' } },
    ]
    const result = compileTokens(tokens)
    expect(result[0]).toHaveProperty('comment', 'comment-1')
    expect(result[0]).toHaveProperty('value', 'value-2')
  })

  test('should return resolved tokens with multiple refs', () => {
    const tokens = [
      { token1: { value: '{token2.value} {token3.value}' } },
      { token2: { value: 'value-2' } },
      { token3: { value: '{token4.value}' } },
      { token4: { value: 'value-4' } },
    ]
    const result = compileTokens(tokens)
    expect(result[0]).toHaveProperty('value', 'value-2 value-4')
  })

  test('should throw error with cycled refs', () => {
    const tokens = [
      { token1: { value: '{token2.value}' } },
      { token2: { value: '{token1.value}' } },
    ]
    try {
      compileTokens(tokens)
    } catch (error) {
      expect(error instanceof CircularRefsException).toBeTruthy()
    }
  })

  test('should resolve token value from nested path (dot-case)', () => {
    const tokens = [
      { token1: { value: '{token2.nested.value}' } },
      { token2: { nested: { value: 'value-2' } } },
    ]
    const result = compileTokens(tokens)
    expect(result[0]).toHaveProperty('value', 'value-2')
  })

  test('should resolve token value from nested path (camel-case)', () => {
    const tokens = [
      { token1: { value: '{token2.nested.value}' } },
      { token2Nested: { value: 'value-2' } },
    ]
    const result = compileTokens(tokens)
    expect(result[0]).toHaveProperty('value', 'value-2')
  })

  test('should throw error when reference not found', () => {
    try {
      const tokens = [{ token1: { value: '{token2.value}' } }]
      compileTokens(tokens)
    } catch (error) {
      expect(error instanceof NotFoundRefException).toBeTruthy()
    }
  })
})
