import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

const config = defineConfig({
  presets: [presetUno(), presetAttributify(), presetExtra()],
  cli: {
    entry: {
      patterns: ['./components/**/*.{tsx,jsx}'],
      outFile: './components/_style/uno.css',
    },
  },
})

export default config
