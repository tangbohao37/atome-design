<template>
  <NDrawer v-model:show="isActive" width="500" placement="right">
    <NDrawerContent closable title="更新记录">
      <div class="container">
        <NForm
          ref="formRef"
          :model="formValue"
          label-placement="left"
          label-width="49"
          label-align="center"
        >
          <NGrid :cols="24" :x-gap="10">
            <NFormItemGi :span="12" label="版本" path="version1">
              <NSelect
                :options="logsOptions"
                v-model:value="formValue.version1"
              >
              </NSelect>
            </NFormItemGi>
            <NFormItemGi :span="12" path="version2" label="至">
              <NSelect
                :options="logsOptions?.reverse()"
                v-model:value="formValue.version2"
              ></NSelect>
            </NFormItemGi>
            <NFormItemGi :span="24" label="类型" path="type">
              <NSelect
                multiple
                :options="logsTypeOptions"
                v-model:value="formValue.type"
              >
              </NSelect>
            </NFormItemGi>
          </NGrid>
        </NForm>
        <NScrollbar style="flex: 1; overflow: hidden">
          <div
            style="margin-top: 10px"
            v-for="log in logContent"
            :key="log.version"
          >
            <NCard v-show="filterVersions(log)">
              <template #header>
                <NGradientText type="info">
                  {{ log.version + " " + log.date }}
                </NGradientText>
              </template>
              <NUl>
                <NLi v-for="change in log.changes" :key="change.description">
                  <div v-show="filterLogsContent(change)">
                    <NH6 prefix="bar" align-text type="info">
                      {{ change.category }}
                    </NH6>
                    <Markdown :source="change.description" />
                  </div>
                </NLi>
              </NUl>
            </NCard>
          </div>
        </NScrollbar>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import {
  NDrawer,
  NDrawerContent,
  NForm,
  NGrid,
  NSelect,
  NFormItemGi,
  type FormInst,
  NCard,
  NGradientText,
  NH6,
  NUl,
  NLi,
  NScrollbar,
} from "naive-ui";
import { computed, ref, watchEffect } from "vue";
import { parseChangelog, type IChangelog, type IChange } from "./tools";
import { useData } from "vitepress";
import semver from "semver";
import Markdown from "vue3-markdown-it";
import { type AdvThemeConfig } from "../types";

interface IRecordDrawer {
  active: boolean;
  changelogContent: string;
}

const logContent = ref<IChangelog[]>();
const formRef = ref<FormInst>();
const formValue = ref({
  version1: "",
  version2: "",
  type: [] as string[],
});

const { frontmatter } = useData<AdvThemeConfig>();

const logsOptions = computed(() => {
  return logContent.value?.map((log: any) => ({
    label: log.version,
    value: log.version,
  }));
});

const logsTypeOptions = computed(() => {
  const type = logContent.value
    ?.flatMap((log: any) => log.changes)
    .flatMap((change: any) => change.category);
  const options = Array.from(new Set(type)).map((category: any) => ({
    label: category,
    value: category,
  }));
  return options;
});

const filterVersions = (log: any) => {
  const [v1, v2] = [formValue.value.version1, formValue.value.version2].sort(
    semver.compare,
  );
  return semver.satisfies(log.version, `>=${v1} <=${v2}`);
};

const filterLogsContent = (change: IChange) => {
  return (
    formValue.value.type.includes(change.category) &&
    change.component.toUpperCase() === frontmatter.value["title"]?.toUpperCase()
  );
};

watchEffect(async () => {
  if (!props.changelogContent) {
    return;
  }
  const result: IChangelog[] = parseChangelog(props.changelogContent);
  logContent.value = result;
  formValue.value = {
    version1: logsOptions?.value?.[0].value,
    version2: logsOptions?.value?.reverse()?.[0].value,
    type: logsTypeOptions?.value?.map((o: any) => o.value) || [],
  };
});

const props = defineProps<IRecordDrawer>();
const emit = defineEmits<{
  "update:active": [active: IRecordDrawer["active"]];
}>();

const isActive = computed({
  get() {
    return props.active;
  },
  set(val) {
    emit("update:active", val);
  },
});
</script>

<style scoped lang="css">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
