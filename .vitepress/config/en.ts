import { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const enConfig:LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    // changelogPath: path.resolve(__dirname, "../../../CHANGELOG.md"),
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/zh-cn/guide/' },
      { text: 'Components', link: '/components/' },
      { text: 'Contributing', link: '/contributing/' },
    ],
    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: [
          {
            text: 'Guide',
            items: [{ text: 'Start', link: '/' }],
          },
        ],
      },
      '/components/': {
        base: '/components/',
        items: [
          {
            text: 'Examples Components',
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
      '/contributing/': {
        base: '/contributing/',
        items: [
          {
            text: 'Development Workflow',
            link: '/',
          },
          {
            text: 'Branch Organization',
            link: '/branch-organization',
          },
        ],
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
}