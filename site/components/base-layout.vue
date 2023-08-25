<template>
  <NConfigProvider :theme="isDark ? darkTheme : undefined">
    <Layout>
      <template #doc-before>
        <NSpace justify="space-between">
          <img
            src="https://img.shields.io/codecov/c/github/vuejs/vue.svg"
            alt=""
          />
          <NButton
            v-if="changelogContent && !frontmatter.hideRecord"
            tertiary
            type="primary"
            @click="active = true"
          >
            更新记录
          </NButton>
        </NSpace>
        <NDivider />
      </template>
    </Layout>
    <RecordDrawer
      :changelog-content="changelogContent"
      v-model:active="active"
    ></RecordDrawer>
  </NConfigProvider>
</template>

<script setup lang="ts">
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import DefaultTheme from "vitepress/theme";
import { NDivider, NButton, darkTheme, NSpace } from "naive-ui";
import RecordDrawer from "./record-drawer.vue";
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
import { type AdvThemeConfig } from "../types";

const { Layout } = DefaultTheme;
const { isDark } = useData();
const active = ref(false);
const changelogContent = ref("");

const { theme, frontmatter } = useData<AdvThemeConfig>();

onMounted(async () => {
  const changelogPath = theme.value.changelogPath;
  if (!changelogPath) {
    return;
  }
  const importPath = `${changelogPath}?raw`;
  const module = await import(/* @vite-ignore */ importPath);
  changelogContent.value = module.default;
});
</script>

<style scoped></style>
