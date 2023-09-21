module.exports = {
  printWidth: 160, // 打印长度
  useTabs: false, // 关闭tab缩进
  quoteProps: 'as-needed', // 对象属性的引号
  singleQuote: true, // 使用单引号
  trailingComma: 'all', // 尾随逗号
  bracketSpacing: true, // 对象中括号之间的空格
  bracketSameLine: true, // 标签尾部换行
  jsxSingleQuote: false, // JSX 是否使用单引号
  arrowParens: 'always', // 箭头函数总是使用括号
  proseWrap: 'preserve', // 默认换行策略
  htmlWhitespaceSensitivity: 'css', // html标签空白敏感度与css
  vueIndentScriptAndStyle: false, // .vue 文件script不缩进
  endOfLine: 'lf', // 结束行统一为 lf
  embeddedLanguageFormatting: 'auto', // 自动格式化嵌入代码
  semi: false, // 关闭结尾分号
  plugins: [
    require.resolve('prettier-plugin-organize-imports'), // import 排序 组合 去除无用
    require.resolve('prettier-plugin-packagejson'), // package.json 里面的 key 好好排序
  ],
}
