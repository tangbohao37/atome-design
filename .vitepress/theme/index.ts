import "@arco-design/web-react/dist/css/arco.css";
import BaseLayout from "../../site/components/base-layout.vue";
import LiveEditor from "../../site/components/live-editor.vue";
import { type Theme } from "vitepress";
import { create, NConfigProvider } from "naive-ui";

const naive = create({
  components: [NConfigProvider],
});

const theme: Theme = {
  Layout: BaseLayout,
  enhanceApp(ctx) {
    ctx.app.component("LiveEditor", LiveEditor);
    ctx.app.use(naive);
  },
};

export default theme;
