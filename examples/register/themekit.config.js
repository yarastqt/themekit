const Themekit = require('../../src/index')

Themekit.registerTransform({
  name: 'custom-transform',
  type: 'name',
  transformer({ token }) {
    return token.path.join('-')
  },
})

Themekit.registerFormat({
  name: 'custom-format',
  formatter({ tokens }) {
    const props = tokens.map((token) => `  --${token.name}: ${token.value};`).join('\n')
    return `:root {\n${props}\n}\n`
  },
})

Themekit.registerPreset({
  name: 'custom-preset',
  transforms: ['custom-transform'],
})

module.exports = {
  entry: {
    default: './themes/default.theme.json',
  },
  output: {
    css: {
      preset: 'custom-preset',
      buildPath: './themes',
      files: [
        {
          destination: '[entry]/[platform]/root.css',
          format: 'custom-format',
        },
      ],
    },
  },
}
