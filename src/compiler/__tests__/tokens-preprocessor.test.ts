import { preprocessTokens } from '../tokens-preprocessor'
import {
  NotFoundTransformException,
  NotFoundFilterException,
  NotFoundFormatException,
} from '../errors'
import { missingTransform } from './fixtures/missing-transform'
import { missingFormat } from './fixtures/missing-format'
import { missingFilter } from './fixtures/missing-filter'
import { simple } from './fixtures/simple'
import { filter } from './fixtures/filter'

describe('tokens-preprocessor', () => {
  test('should throw error when transform not found', () => {
    try {
      preprocessTokens(missingTransform.options, missingTransform.context)
    } catch (error) {
      expect(error instanceof NotFoundTransformException).toBeTruthy()
    }
  })

  test('should throw error when format not found', () => {
    try {
      preprocessTokens(missingFormat.options, missingFormat.context)
    } catch (error) {
      expect(error instanceof NotFoundFormatException).toBeTruthy()
    }
  })

  test('should throw error when filter not found', () => {
    try {
      preprocessTokens(missingFilter.options, missingFilter.context)
    } catch (error) {
      expect(error instanceof NotFoundFilterException).toBeTruthy()
    }
  })

  test('should return preprocessed tokens', () => {
    const result = preprocessTokens(simple.options, simple.context)
    expect(result).toMatchInlineSnapshot(`
      Object {
        "css": Array [
          Object {
            "content": "token-1-path:value-1,token-2-path:value-2",
            "destination": "tokens.css",
          },
        ],
      }
    `)
  })

  test('should return preprocessed tokens with filter', () => {
    const result = preprocessTokens(filter.options, filter.context)
    expect(result).toMatchInlineSnapshot(`
      Object {
        "css": Array [
          Object {
            "content": "token-1-path:value-1",
            "destination": "tokens-1.css",
          },
          Object {
            "content": "token-2-path:value-2",
            "destination": "tokens-2.css",
          },
        ],
      }
    `)
  })

  test.todo('should return preprocessed tokens with context')
})
