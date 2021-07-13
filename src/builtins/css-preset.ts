import type { Preset } from '../types'

export const cssPreset: Preset = {
  name: 'css',
  transforms: ['name/cti/kebab', 'name/mapper', 'value/color-function'],
}
