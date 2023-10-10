import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const zhConfig:LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // changelogPath: path.resolve(__dirname, "../../../CHANGELOG.md"),
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/zh-cn/guide/' },
      { text: '组件', link: '/zh-cn/components/' },
      { text: '开发', link: '/zh-cn/contributing/' },
    ],
    sidebar: {
      '/zh-cn/guide/': {
        base: '/zh-cn/guide/',
        items: [
          {
            text: '指南',
            items: [{ text: '开始', link: '/' }],
          },
        ],
      },
      '/zh-cn/components/': {
        base: '/zh-cn/components/',
        items: [
          {
            text: '组件',
            items: [
              { text: 'Button', link: '/button/' },
              { text: 'Icon', link: '/icon/' },
              { text: 'Typography', link: '/typography/' },
              { text: 'Layout', link: '/layout/' },
              { text: 'Loading', link: '/loading/' },
            ],
          },
        ],
      },
      '/zh-cn/contributing/': {
        base: '/zh-cn/contributing/',
        items: [
          {
            text: '准备工作',
            link: '/',
          },
          {
            text: '分支管理',
            link: '/branch-organization',
          },
          {
            text: '贡献指南',
            link: '/develop-components',
          },
        ],
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  }, 
}