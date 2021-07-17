import type { Output } from '../../compiler/types'
import { glob } from './glob'

export interface Config {
  /**
   *
   */
  entry: Record<string, string>
  /**
   *
   */
  output: Record<string, Output>
}

/**
 * Loads config with one of available extensions (js, json, yaml).
 *
 * @param path - Config path.
 * @returns Config.
 */
export function loadConfig(path: string): Config {
  // Use glob for get config with one of available extensions.
  const [configPath] = glob(path)

  if (configPath === undefined) {
    throw new Error(`Cannot load config from: "${path}",.`)
  }

  const config = require(configPath)

  return config
}
