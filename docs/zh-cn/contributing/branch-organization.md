# 分支管理

## 分支管理规范

采用主干开发模式+里程碑管理feature与分支 （[rebase 学习](https://juejin.cn/post/6969101234338791432)）

> 特性分支模式与主干开发模式 ([对比解析](https://juejin.cn/post/6967981728619544606))

分支命名规范：`/^(master|main|develop){1}$|^(feature|fix|hotfix|release)\/.+$/g`

- 所有的开发人员仅在一个主干分支（master）上进行协作开发
- 不允许新建其他长期存在的开发分支
- 所有的代码提交均需要在主干分支上完成
- 通常开发者需要有较高频率的代码推送行为，一般一天至少提交一次
- 主干分支上拉出发布分支（release）进行版本发布
- 开发或测试过程中发现的代码缺陷也会直接在主干上进行修复
- 根据实际需求 cherry pick 到特定的发布分支或是进行新版本发布

![TBD](/assets/images/TBD.png)

![TBD++](/assets/images/TBD++.png)

## 代码合并规范

TODO: 待补充

## Commit 规范

:::details 提交流程
每次提交会自动触发提交验证

- 使用工具 commitizen 协助规范 git commit 信息
- fix & feat 的提交会被用来生成 changelog
- 提交会触发 git pre-commit 检查，修复提示的 eslint 错误

具体细节可参考 husky 配置
:::

**统一使用 `pnpm commit` 命令提交**

编写良好的Commit messages可以达到3个重要的目的：

- 加快review的流程
- 帮助我们编写良好的版本发布日志
- 让之后的维护者了解代码里出现特定变化

> ⚠️特别注意:**commit messages 最终会被用于生成版本发布日志**，所以请务必认真对待。
> ![历史记录](/assets/images/version-history.png)

```bash
# 推荐使用 pnpm commit 命令提交
git add .
pnpm commit
```

![commit1](/assets/images/commit1.png)
![commit2](/assets/images/commit2.png)
![commit3](/assets/images/commit3.png)

## 版本迭代规范

### 版本更新命令

禁止手动修改 `package.json` 中的版本号，统一使用 `pnpm run release` 命令更新版本号

```bash
# 该命令会基于提交记录生成changelog
pnpm run release
```

| `pnpm run release -- --first-release`        | 第一次发布                                          |
| -------------------------------------------- | --------------------------------------------------- |
| `pnpm run release -- --prerelease`           | `x.x.x-0`                                           |
| `pnpm run release -- --prerelease alpha`     | `x.x.x-alpha.0`                                     |
| `pnpm run release -- --release-as <version>` | eg： `pnpm run release -- --release-as 2.2.0 2.2.0` |
| `pnpm run release -- --release-as minor`     | `1.0.0 -> 1.1.0`                                    |
