declare module 'css-color-function' {
  namespace cssColorFunction {
    function convert(value: string): string
  }
  export = cssColorFunction
}

declare module 'normalize-path' {
  function normalize(path: string, trailingSlashes?: boolean): string
  export default normalize
}
