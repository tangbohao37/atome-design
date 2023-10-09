import {enConfig} from './en'
import {zhConfig} from './zh'
import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfigWithTheme } from 'vitepress'
import { demoBlockPlugin } from '../../site/plugins'
import { type AdvThemeConfig } from '../../site/types'

export default defineConfigWithTheme<AdvThemeConfig>({
  title: 'Atome Design',
  description: 'Atome Design Components for React',
  lang: 'en',
  base: '/atome-design/',
  srcDir: 'docs',
  vite: {
    plugins: [Inspect()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../'),
      },
    },
    ssr: {
      noExternal: ['naive-ui', 'veaury', '@arco-design/web-react'],
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      ...enConfig
    },
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-cn',
      ...zhConfig
    },
  },
  markdown: {
    config(md) {
      md.use(demoBlockPlugin)
    },
  },
})