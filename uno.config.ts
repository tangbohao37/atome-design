import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

const config = defineConfig({
  presets: [presetUno(), presetAttributify(), presetExtra()],
  cli: {
    entry: {
      patterns: ['src/**/*.{tsx,jsx}'],
      outFile: 'uno.css',
    },
  },
})

export default config
