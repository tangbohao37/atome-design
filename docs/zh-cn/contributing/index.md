# 研发指南

## 开发环境

| vscode插件：Unocss                                                                                           | ![img](/assets/images/unocss.png)鼠标放在unocs上会有代码提示                      |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| vscode-Settings-User-Extensions-TypeScript › Tsserver: Plugin Paths Add items：typescript-plugin-css-modules | ![img](/assets//images//css_module.png)此时鼠标放在style['loading']上会有代码提示 |
| volta                                                                                                        | 推荐使用 `volta` 管理 `nodejs` 版本                                               |
| pnpm                                                                                                         | 包管理工具                                                                        |
| nodejs                                                                                                       | >= 18.0.0 （**强烈建议开启 corepack**）                                           |

## 目录结构定义

```

├── components（组件代码文件夹）
│   ├── _assets（静态资源(图片、字体等)文件）
│   │   ├── fonts
│   │   ├── icons
│   │   └── images
│   ├── button
│   ├── icon
│   ├── layout
│   ├── loading
│   └── .....
├── coverage（测试覆盖率，自动生成请勿修改）
├── docs（组件预览说明文档）
│   ├── assets （站点使用的静态资源）
│   ├── components
│   │   ├── button
│   └── zh-cn
│       ├── components
│       │   ├── button
├── example（使用用例）
│   ├── button
│   ├── icon
│   └── .....
├── es (build 产物，git ignore掉的)
├── site（vitepress站点文档预览的代码）
```

## 样式规范

### 1. unocss

- 配置文件在 `unocss.config.js` 中
- 使用：

```html
<div className="{flex justify-center items-center w-full h-full}"></div>
```

- 产物：

```css
/* layer: preflights */
*,::before,::after{.......}
/* layer: default */
.h-full{height:100%;}
.w-full{width:100%;}
.flex{display:flex;}
.items-center{align-items:center;}
.justify-center{justify-content:center;}
```

### 2. css module

- 新建文件命名规范：`[name].module.css`
- class命名规范：`.atome-[component]-xxx`
- 引入规范：`import styles from './[name].module.css'` (根据`开发环境`正常配置，可以出现智能`css`提示)
- 使用：

```js
// 使用
import style from './style/index.module.less'
export const Loading = (xx) => {
  return (
    <div className={`${style['loading-bg']}`}>
      <img className={style['loading']} src={xx} alt="" />
    </div>
  )
}
```

### 3. 公共变量存放

- components/\_style
- components/\_style/variables.css 公共变量
- components/\_style/theme/dark.css 暗黑主题
- 变量命名 --atome-xxx

## 分支管理规范

> 特性分支模式与主干开发模式 ([对比解析](https://juejin.cn/post/6967981728619544606))

采用主干开发模式+里程碑管理feature与分支 （[rebase 学习](https://juejin.cn/post/6969101234338791432)）

分支命名规范：`^master|develop|(feature|fix|hotfix|release)\/.+`

- 所有的开发人员仅在一个主干分支（master）上进行协作开发
- 不允许新建其他长期存在的开发分支
- 所有的代码提交均需要在主干分支上完成
- 通常开发者需要有较高频率的代码推送行为，一般一天至少提交一次
- 主干分支上拉出发布分支（release）进行版本发布
- 开发或测试过程中发现的代码缺陷也会直接在主干上进行修复
- 根据实际需求 cherry pick 到特定的发布分支或是进行新版本发布

![TBD](/assets/images/TBD.png)

![TBD++](/assets/images/TBD++.png)

## 迭代规范

### commit 规范

```bash
git add .
pnpm commit
```

![commit1](/assets/images/commit1.png)
![commit2](/assets/images/commit2.png)
![commit3](/assets/images/commit3.png)

### 版本更新规范

```bash
# 命令
pnpm run release
```

该库会基于提交记录生成changelog

| `pnpm run release -- --first-release`        | 第一次发布                                          |
| -------------------------------------------- | --------------------------------------------------- |
| `pnpm run release -- --prerelease`           | `x.x.x-0`                                           |
| `pnpm run release -- --prerelease alpha`     | `x.x.x-alpha.0`                                     |
| `pnpm run release -- --release-as <version>` | eg： `pnpm run release -- --release-as 2.2.0 2.2.0` |
| `pnpm run release -- --release-as minor`     | `1.0.0 -> 1.1.0`                                    |

## 开发原则和编程技巧

- 单一职责原则（SRP）：
  - 编码体现：一个对象/方法只做一件事情
  - 实现：就一个类/方法而言，应该仅有一个引起它变化的原因
  - 目的：把对象划分成较小的粒度，这可以提高对象的可复用性
- 最少知识原则（LKP）：
  - 编码体现：尽量减少对象之间的交互
  - 实现：如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的相互联系，一定要交互可以引入第三者来承担通信职责
  - 目的：减少“城门失火，殃及池鱼”和“一人犯法，株连九族”的情况
- 开放-封闭原则（OCP）：
  - 软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改
  - 最简单的就是找出程序中将要发生变化的地方，然后把变化封装起来。通过封装变化的方式，可以把系统中稳定不变的部分和容易变化的部分隔离开来。在系统的演变过程中，我们只需要替换那些容易变化的部分，如果这些部分是已经被封装好的，那么替换起来也相对容易。而变化部分之外的就是稳定的部分。
- 代码重构思路：
  - 提炼函数
  - 合并重复的条件片段
  - 把分支语句提炼成函数
  - 合理使用循环
  - 提前让函数退出替代嵌套条件分支
  - 传递对象参数代替过长的参数列表
  - 尽量减少参数数量
  - 合理使用链式调用
  - 少用三目运算符
  - 分解大型类
  - 用 return 退出多重循环
