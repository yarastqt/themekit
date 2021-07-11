import type { Context, Filter, Format, Transform } from './types'

export function createContext() {
  const context: Context = {
    filters: new Map(),
    formats: new Map(),
    transforms: new Map(),
  }

  return {
    value: context,
    registerFilter: (filter: Filter) => {
      context.filters.set(filter.name, filter)
    },
    registerFormat: (format: Format) => {
      context.formats.set(format.name, format)
    },
    registerTransform: (transform: Transform) => {
      context.transforms.set(transform.name, transform)
    },
  }
}
