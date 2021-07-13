import { formatToFlatJson } from '../flat-json-format'
import { tokens } from './fixtures/simple'

describe('flat-json-format', () => {
  test('should return content with flat json', () => {
    const result = formatToFlatJson.formatter({ tokens })
    expect(result).toMatchInlineSnapshot(`
      "[
        {
          \\"attributes\\": {},
          \\"comment\\": \\"comment\\",
          \\"name\\": \\"token-1\\",
          \\"original\\": {
            \\"value\\": \\"{token-2.value} {token-3.value}\\"
          },
          \\"path\\": [],
          \\"refs\\": [
            {
              \\"name\\": \\"token-2\\",
              \\"value\\": \\"value-2\\"
            },
            {
              \\"name\\": \\"token-3\\",
              \\"value\\": \\"value-3\\"
            }
          ],
          \\"value\\": \\"value-2 value-3\\"
        },
        {
          \\"attributes\\": {},
          \\"name\\": \\"token-2\\",
          \\"original\\": {
            \\"value\\": \\"value-2\\"
          },
          \\"path\\": [],
          \\"refs\\": [],
          \\"value\\": \\"value-2\\"
        },
        {
          \\"attributes\\": {},
          \\"name\\": \\"token-3\\",
          \\"original\\": {
            \\"value\\": \\"value-3\\"
          },
          \\"path\\": [],
          \\"refs\\": [],
          \\"value\\": \\"value-3\\"
        }
      ]"
    `)
  })
})
