import { defineConfigWithTheme } from "vitepress";
import { type AdvThemeConfig } from "../site/types";
import { demoBlockPlugin } from "../site/plugins";
import path from "path";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<AdvThemeConfig>({
  title: "Atome Design",
  description: "Atome Design Components for React",
  lang: "en-US",
  base: "/atome-design/",
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../"),
      },
    },
    ssr: {
      noExternal: ["naive-ui", "veaury", "@arco-design/web-react"],
    },
  },
  markdown: {
    config(md) {
      md.use(demoBlockPlugin);
    },
  },
  themeConfig: {
    // changelogPath: path.resolve(__dirname, "../../../CHANGELOG.md"),
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Components", link: "/components/" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Start", link: "/docs/guide/" }],
      },
      {
        text: "Examples Components",
        items: [
          { text: "Button", link: "/components/button/" },
          { text: "Icon", link: "/components/icon/" },
          { text: "Typography", link: "/components/typography/" },
          { text: "Layout", link: "/components/layout/" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
