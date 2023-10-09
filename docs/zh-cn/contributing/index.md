# 研发指南

## 开发环境

| 插件                                                         | 作用                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| vscode插件：Unocss                                           | ![img](/assets/images/unocss.png)鼠标放在unocss上会有代码提示 |
| vscode-Settings-User-Extensions-TypeScript › Tsserver: Plugin Paths Add items：typescript-plugin-css-modules | ![img](/assets//images//css_module.png)此时鼠标放在style['loading']上会有代码提示 |
| volta                                                        | 推荐使用 `volta` 管理 `nodejs` 版本                          |
| pnpm                                                         | 包管理工具                                                   |
| nodejs                                                       | >= 18.0.0 （**强烈建议开启 corepack**）                      |
|                                                              |                                                              |



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

### 1. 公共变量存放

- components/\_style
- components/\_style/variables.css 公共变量
- components/\_style/theme/dark.css 暗黑主题
- **变量命名: --atome-xxx**

### 2. unocss

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

### 3. css module

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

## 命名规范

### 推荐的命名方法
> 驼峰式命名法介绍:
> - Pascal Case 大驼峰式命名法：首字母大写。eg：StudentInfo、UserInfo、ProductInfo  
> - Camel Case 小驼峰式命名法：首字母小写。eg：studentInfo、userInfo、productInfo

###  变量命名规范

- 命名方法: 小驼峰式命名法
- 命名规范 : 类型+对象描述的方式，如果没有明确的类型，就可以使前缀为名词。  

> 常见的不规范命名:
> * 单词拼写错误 (推荐安装`Code Spell Checker`自动检测)
> * 中英文混用
> * 以1-9，a-z命名
> * 混用命名格式
> * 单复数不分
> * 正反义词错用

### 常量命名规范

- 命名方法 : 全部大写  
- 命名规范 : 使用大写字母和下划线来组合命名，下划线用以分割单词。  
推荐： 

```js
 var MAX_COUNT = 10;
 var URL = 'http://www.baidu.com';
```


### 函数

命名方式 : 小驼峰方式 ( 构造函数使用大驼峰命名法 )  
命名规则 : 前缀为动词  

| 动词 | 含义                            | 返回值                                     |
| ---- | ------------------------------- | ------------------------------------------ |
| can  | 判断是否可执行某个动作 ( 权限 ) | true-可执行，false-不可执行                |
| has  | 判断是否含有某个值              | true-含有此值，false-不含此值              |
| is   | 判断是否为某个值                | true-为某个值，false-不为某值              |
| get  | 获取某个值                      | 函数返回一个非布尔值                       |
| set  | 设置某个值                      | 无返回值、返回是否设置成功或者返回链式对象 |

```js
//是否可阅读
function canRead(){
    return true;
}
//获取姓名
function getName{
    return this.name
}
```

### 文件资源命名规范
- 文件名不得含有空格。  
- 文件名建议只使用小写字母，不使用大写字母。( 为了醒目，某些说明文件的文件名，可以使用大写字母，比如README、LICENSE)。  
- 文件名包含多个单词时，单词之间建议使用半角的连词线 ( - ) 分隔。  

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
