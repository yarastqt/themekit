import { convert } from 'css-color-function'

import type { Transform } from '../types'

/**
 * Transform which convert value with color function to color.
 */
export const transformValueWithColorFn: Transform = {
  name: 'value/color-function',
  type: 'value',
  transformer: ({ token }) => {
    let executed

    while ((executed = colorRe.exec(String(token.value))) !== null) {
      token.value = String(token.value).replace(executed[0], convert(executed[0]))
    }

    return token.value as string
  },
}

const colorRe = /color\((?!{).+\)/g
