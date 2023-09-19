<template>
  <NConfigProvider :theme="isDark ? darkTheme : undefined">
    <Layout>
      <template #doc-before>
        <NSpace justify="space-between">
          <NSpace>
            <img
              alt="Static Badge"
              :src="`https://img.shields.io/badge/coverage%3Alines-${
                currentSummary?.lines?.pct || 0
              }%25-${getColorByCoverage(currentSummary?.lines?.pct || 0)}`" />
            <img
              alt="Static Badge"
              :src="`https://img.shields.io/badge/coverage%3Astatements-${
                currentSummary?.statements?.pct || 0
              }%25-${getColorByCoverage(currentSummary?.statements?.pct || 0)}`" />
            <img
              alt="Static Badge"
              :src="`https://img.shields.io/badge/coverage%3Afunctions-${
                currentSummary?.functions?.pct || 0
              }%25-${getColorByCoverage(currentSummary?.functions?.pct || 0)}`" />
            <img
              alt="Static Badge"
              :src="`https://img.shields.io/badge/coverage%3Abranches-${
                currentSummary?.branches?.pct || 0
              }%25-${getColorByCoverage(currentSummary?.branches?.pct || 0)}`" />
          </NSpace>
          <NButton v-if="changelogContent && !frontmatter.hideRecord" tertiary type="primary" @click="active = true">
            更新记录
          </NButton>
        </NSpace>
        <NDivider />
      </template>
    </Layout>
    <RecordDrawer :changelog-content="changelogContent" v-model:active="active"></RecordDrawer>
  </NConfigProvider>
</template>

<script setup lang="ts">
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import DefaultTheme from 'vitepress/theme'
import { NDivider, NButton, darkTheme, NSpace } from 'naive-ui'
import RecordDrawer from './record-drawer.vue'
import { useData, useRoute } from 'vitepress'
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { type AdvThemeConfig } from '../types'
import summary from '../../coverage/coverage-summary.json'

const coverageColorMap = {
  100: 'lime',
  80: 'limegreen',
  60: 'goldenrod',
  40: 'orange',
  20: 'orangered',
  10: 'deeppink',
  0: 'indianred',
}

const { Layout } = DefaultTheme
const active = ref(false)
const changelogContent = ref('')
const { theme, frontmatter, isDark } = useData<AdvThemeConfig>()
const currentSummary = ref<any>()
const route = useRoute()

watchEffect(() => {
  const [key] = Object.keys(summary).filter((k) => k.includes(route.path))
  currentSummary.value = summary[key]
})

function getColorByCoverage(coverage) {
  // 首先按照数值降序对映射的键进行排序
  const sortedKeys = Object.keys(coverageColorMap).sort((a, b) => +b - +a)

  // 遍历排序后的键，找到第一个小于等于给定覆盖率的键，并返回相应的颜色
  for (const key of sortedKeys) {
    if (coverage >= parseFloat(key)) {
      return coverageColorMap[key]
    }
  }
  // 如果没有匹配的覆盖率范围，则返回默认颜色（可根据需要自定义）
  return coverageColorMap[sortedKeys[sortedKeys.length - 1]]
}

onMounted(async () => {
  const changelogPath = theme.value.changelogPath
  if (!changelogPath) {
    return
  }
  const importPath = `${changelogPath}?raw`
  const module = await import(/* @vite-ignore */ importPath)
  changelogContent.value = module.default
})
</script>

<style scoped></style>
