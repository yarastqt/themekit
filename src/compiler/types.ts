export interface File {
  /**
   * File destination.
   */
  destination: string
  /**
   * File format.
   */
  format: string
  /**
   * Shared options for format, transform or filter.
   */
  options?: Record<string, any>
  /**
   * File filter.
   */
  filter?: string
}

export interface Output {
  /**
   * Preset with predefined transforms.
   */
  preset?: string
  /**
   * List of transforms.
   */
  transforms?: string[]
  /**
   * List of result files.
   */
  files: File[]
}

export interface Options {
  /**
   * Output map.
   */
  output: Record<string, Output>
  /**
   * Shared context.
   */
  context?: Record<string, any>
}
