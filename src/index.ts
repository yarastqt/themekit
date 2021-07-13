import { createCompiler } from './compiler'
import { createContext } from './context'
import { registerBuiltins } from './builtins'

const context = createContext()
registerBuiltins(context)

export const compile = createCompiler(context.value)
export const registerFilter = context.registerFilter
export const registerFormat = context.registerFormat
export const registerTransform = context.registerTransform
export const registerPreset = context.registerPreset
