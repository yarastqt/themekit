import type { Context, ContextValue } from './types'

export function createContext(): Context {
  const context: ContextValue = {
    filters: new Map(),
    formats: new Map(),
    transforms: new Map(),
    presets: new Map(),
  }

  return {
    value: context,
    registerFilter: (filter) => {
      context.filters.set(filter.name, filter)
    },
    registerFormat: (format) => {
      context.formats.set(format.name, format)
    },
    registerTransform: (transform) => {
      context.transforms.set(transform.name, transform)
    },
    registerPreset: (preset) => {
      context.presets.set(preset.name, preset)
    },
  }
}
