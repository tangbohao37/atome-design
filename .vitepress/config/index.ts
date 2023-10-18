import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfigWithTheme } from 'vitepress'
import { type AdvThemeConfig } from 'vitepress-theme-components'
import { baseConfig } from 'vitepress-theme-components/config'
import { enConfig } from './en'
import { zhConfig } from './zh'

export default defineConfigWithTheme<AdvThemeConfig>({
  title: 'Atome Design',
  description: 'Atome Design Components for React',
  lang: 'en',
  base: '/atome-design/',
  outDir: path.resolve(__dirname, '../../public'),
  srcDir: 'docs',
  extends: baseConfig,
  vite: {
    plugins: [Inspect()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../'),
      },
    },
    ssr: {
      noExternal: ['@arco-design/web-react'],
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      ...enConfig,
    },
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-cn',
      ...zhConfig,
    },
  },
})
