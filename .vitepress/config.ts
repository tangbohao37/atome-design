import path from 'path'
import Inspect from 'vite-plugin-inspect'

import { defineConfigWithTheme } from 'vitepress'
import { demoBlockPlugin } from '../site/plugins'
import { type AdvThemeConfig } from '../site/types'

// https://vitepress.dev/reference/site-config
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
        '@': path.resolve(__dirname, '../'),
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
    },
    'zh-cn': {
      label: '简体中文',
      lang: 'zh-cn',
    },
  },
  markdown: {
    config(md) {
      md.use(demoBlockPlugin)
    },
  },
  themeConfig: {
    // changelogPath: path.resolve(__dirname, "../../../CHANGELOG.md"),
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'Contributing', link: '/contributing/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Start', link: '/guide/' }],
      },
      {
        text: 'Examples Components',
        items: [
          { text: 'Button', link: '/components/button/' },
          { text: 'Icon', link: '/components/icon/' },
          { text: 'Typography', link: '/components/typography/' },
          { text: 'Layout', link: '/components/layout/' },
          { text: 'Loading', link: '/components/loading/' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
