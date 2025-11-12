// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  rules: {
    'nuxt/no-cjs-imports': 'off'
  }
)
