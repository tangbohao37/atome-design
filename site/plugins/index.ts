import { type MarkdownRenderer } from "vitepress";
import * as path from "path";
import * as fs from "fs";
import { type ParseResult, parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import * as os from "os";
import { baseParse, transform } from "@vue/compiler-core";
import { type ILiveEditor } from "../types";

const DemoTag = "LiveEditor";
const scriptRE = /<\/script>/;
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/;
const importRegex = /import[\s\S]*?;/g;
const importRecord: Record<string, any> = {};

const filterJSXComments = (code: string) => {
  const commentRegex = /{\/\*[\s\S]*?\*\/}|\/\/.*/g;
  return code.replace(commentRegex, "");
};

const recordImportStatement = (ast: any) => {
  (traverse as any).default(ast, {
    StringLiteral(path: NodePath) {
      if (path.parent.type === "ImportDeclaration") {
        // if (isImportDeclaration(path.parent)) {
        const parent = path.parent;
        const importStatement = parent.source.value;
        const importSpecifiers = parent.specifiers.map(
          (specifier) => specifier.local.name,
        );
        // TODO: 每个 k/v 记录到 importRecord 中， 对于相同的则不在重复加载， 同名的如何处理呢？
        importSpecifiers.forEach((specifier) => {
          importRecord[specifier] = importStatement;
        });
      }
    },
  });
};

const getNeedImportStatement = (demoImportCode: string[]) => {
  return demoImportCode.filter((code) => {
    return !Object.entries(importRecord).filter(([k, v]) => {
      return code.includes(k) && code.includes(v as string);
    }).length;
  });
};

const getFileStatement = (mdFilePath: string, sourceCodePath: string) => {
  // TODO: 如何获取 vite 配置？ 方便使用 @ 别名路径
  const codeFilePath = path.resolve(mdFilePath, sourceCodePath); // 引入的 code 原文件路径
  const fileExists = fs.existsSync(codeFilePath);
  if (!fileExists) {
    console.log(`${sourceCodePath}  未找到原文件!`);
    return;
  }

  const sourceFileStr = fs.readFileSync(codeFilePath, "utf-8");
  const demoImportCode = filterJSXComments(sourceFileStr)?.match(importRegex);
  const _demoImportCode = demoImportCode?.join(os.EOL);

  return {
    sourceFileStr: sourceFileStr.replaceAll('"', "'"),
    demoImportCodeArr: demoImportCode,
    demoImportCodeStr: _demoImportCode,
  };
};

const getImportModules = (ast: ParseResult<any>) => {
  const importModules = new Set<string>();
  // FIXME： 等 @types/babel__traverse 更新 @7.22.5 后修复
  (traverse as any).default(ast, {
    Identifier(path: NodePath<any>) {
      if (
        path.parent.type === "ImportDefaultSpecifier" ||
        path.parent.type === "ImportSpecifier"
      ) {
        importModules.add(path.node.name);
      }
    },
  });

  return Array.from(importModules.keys());
};

interface IPropsType extends ILiveEditor {
  sourceCodePath: string;
}

export function demoBlockPlugin(md: MarkdownRenderer) {
  const addRenderRule = (type: string) => {
    const defaultRender = md.renderer.rules[type];

    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const content = token.content.trim();

      if (!content.match(new RegExp(`^<${DemoTag}\\s`))) {
        return defaultRender!(tokens, idx, options, env, self);
      }
      const props = parseProps<IPropsType>(content);

      if (!props.sourceCodePath) {
        return defaultRender!(tokens, idx, options, env, self);
      }
      const mdFilePath = path.dirname(env.path); // md 原文件路径
      const statement = getFileStatement(mdFilePath, props.sourceCodePath);
      if (!statement) {
        // TODO: 改为错误提示
        return defaultRender!(tokens, idx, options, env, self);
      }
      const { sourceFileStr, demoImportCodeArr, demoImportCodeStr } = statement;

      if (demoImportCodeStr) {
        const ast = parse(demoImportCodeStr, {
          sourceType: "module",
          plugins: ["typescript"],
        });

        const _modules = getImportModules(ast);
        const _demoNeedImportCode = getNeedImportStatement(
          demoImportCodeArr || [],
        );
        const componentRegisStatement = _demoNeedImportCode.join(os.EOL).trim();

        if (!env.sfcBlocks.scripts) {
          env.sfcBlocks.scripts = [];
        }
        const tags = env.sfcBlocks.scripts as { content: string }[];
        const existingSetupScriptIndex = tags?.findIndex(
          (tag) =>
            scriptRE.test(tag.content) &&
            scriptSetupRE.test(tag.content) &&
            !scriptClientRE.test(tag.content),
        );
        if (existingSetupScriptIndex > -1) {
          const tagSrc = tags[existingSetupScriptIndex];
          tags[existingSetupScriptIndex].content = tagSrc.content.replace(
            scriptRE,
            `${componentRegisStatement}</script>`,
          );
        } else {
          tags.unshift({
            content:
              `<script lang="ts" setup >${componentRegisStatement}</script>`.trim(),
          });
        }
        recordImportStatement(ast);
        return liveEditorTemplate({
          sourceCode: sourceFileStr,
          hideCode: props.hideCode,
          noStyle: props.noStyle,
          scope: _modules.toString() as any,
        });
      }
      return liveEditorTemplate({
        sourceCode: sourceFileStr,
        hideCode: props.hideCode,
        noStyle: props.noStyle,
      });
    };
  };
  // addRenderRule('html_block');
  addRenderRule("html_inline");
}

const liveEditorTemplate = ({
  sourceCode,
  hideCode,
  noStyle,
  scope,
}: ILiveEditor) => {
  return `<LiveEditor :scope="{ ${scope} }" sourceCode="${sourceCode}" :hideCode="${hideCode}" :noStyle="${noStyle}" ></LiveEditor>`;
};

export const parseProps = <T extends Record<string, any> = any>(
  content: string,
) => {
  const ast = baseParse(content);
  const propsMap: any = {};
  transform(ast, {
    nodeTransforms: [
      (node) => {
        if (node.type === 1 && node.tag === "LiveEditor") {
          // 元素节点且标签为 LiveEditor
          // 提取参数
          if (node.props.length) {
            node.props.forEach((prop) => {
              if (prop.type === 6) {
                // 属性节点
                propsMap[prop.name] = prop.value?.content;
              }
              if (prop.type === 7) {
                const propName = prop.arg?.loc.source;
                const propVal = prop.exp?.loc.source;
                let v = false;
                try {
                  v = JSON.parse(propVal || "");
                } catch (error) {
                  v = false;
                }
                propName && (propsMap[propName] = v);
              }
            });
          }
        }
      },
    ],
  });

  return propsMap as T;
};
