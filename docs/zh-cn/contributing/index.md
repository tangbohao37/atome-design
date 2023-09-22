# 研发指南

## 开发流程

环境要求:

1. `nodejs` >= 18.0.0
2. 开启 `Corepack` 在 `package.json` 中定义了 `packageManager` 字段 (推荐使用 `volta` 管理 `nodejs` 版本)
3. 使用 `pnpm` 作为包管理工具, 以保证依赖的一致性.

### 本地调试

```bash
# 安装依赖
pnpm install

# 本地调试
pnpm dev
```

### 本地构建

```bash

```

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

## 编码规范

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

## 迭代规范

### commit 规范

```bash
git add .
pnpm commit
```

![An image](/assets/images/commit1.png)
![An image](/assets/images/commit2.png)
![An image](/assets/images/commit3.png)

### 版本更新规范

```bash
pnpm run release
```

该库会基于提交记录生成changelog

| pnpm run release -- --first-release        | 第一次发布                                        |
| ------------------------------------------ | ------------------------------------------------- |
| pnpm run release -- --prerelease           | x.x.x-0                                           |
| pnpm run release -- --prerelease alpha     | x.x.x-alpha.0                                     |
| pnpm run release -- --release-as <version> | eg： pnpm run release -- --release-as 2.2.0 2.2.0 |
| pnpm run release -- --release-as minor     | 1.0.0 -> 1.1.0                                    |

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
