# 组件开发流程

clone 代码到本地,根据[分支规范](./branch-organization) 从**主分支**创建本地 `feature或fix` 分支(eg:`fix/button`)。

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

### 本地测试

```bash
pnpm test
# 或
pnpm test:ui
```

## 新增组件

1. 创建源文件：在 `components` 目录下创建组件文件夹，如 `button`。
2. 创建测试文件：在 `components/button` 目录下创建配套 `__test__` 文件。
3. 创建文档：分别在 `docs/components/button` 和 `docs/zh-cn/components/button` 下创建配套说明文档。
4. 创建目录路由：`.vitepress/config/zh.ts` / `.vitepress/config/en.ts` 分别创建目录 (路由定义遵循[vitepress](https://vitepress.dev/guide/routing.html#routes)的路由定义)。
5. 创建演示文件：`example/button` 下创建配套演示文件，**尽量用`.jsx`** 。
6. 开始编写 :metal: :raised_hands: :open_hands:

### Demo 演示配置

LiveEditor 配置项:

| 属性           | 说明                              | 类型    | 默认值 |
| -------------- | --------------------------------- | ------- | ------ |
| noStyle        | 是否显示边框样式(目前仅有padding) | boolean | false  |
| hideCode       | 是否显示源码                      | boolean | false  |
| sourceCodePath | 代码路径(相对路径)                | string  | Null   |

```md
<!-- 引入演示源码使用用相对路径 -->

<LiveEditor sourceCodePath="../../../example/eg/index.jsx"></LiveEditor>
```

<<< ../../../example/eg/index.jsx

> 渲染如下： :point_down: :point_down:
> <LiveEditor sourceCodePath="../../../example/eg/index.jsx"></LiveEditor>

### frontmatter 配置

| 属性       | 说明                       | 类型    | 默认值 |
| ---------- | -------------------------- | ------- | ------ |
| coverage   | 是否显示组件 Coverage      | boolean | false  |
| hideRecord | 是否隐藏当前组件的迭代记录 | boolean | false  |

#### 是否显示组件 Coverage 配置

Coverage 自动根据组件名字获取，若没有单测则渲染 0%。

```md
---
coverage: true
---
```

#### 是否隐藏当前组件的迭代记录

```md
---
hideRecord: true
---
```

![coverage-record](/assets/images/coverage-record.png)

## 组件 git 操作流程

### 创建分支

```bash
# 从主分支创建本地分支
git checkout main

# 随时记得更新主分支。 切记加上 -r 因为本库采用“主干开发模式”(具体请看"分支管理")
git pull -r  // [!code warning]

# 创建本地分支
git checkout -b fix/button

# 完成开发后提交 (请统一使用提交脚本)
pnpm commit  // [!code warning]

# 如果一个 feature 反复修改后产生多个零散的 commit 建议使用 rebase 合并后提交
git rebase HEAD~n -i
```

### 合并分支

```bash
# 在 fix/button 合并 main 分支
git rebase main -i
# 或
git pull origin main -r

# push 然后提交 MR
git push
```
