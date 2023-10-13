import fs from 'node:fs'
import path from 'node:path'
import minimist from 'minimist'
import prompts from 'prompts'
import { red, reset } from 'kolorist'

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist<{
  c?: string
  component?: string
}>(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const indexContent = (name: string) => `
import style from './style/index.module.less'

export const ${name} = () => {
  return (
    <div className={\`flex justify-center items-center  w-full h-full\`}>
      <div className={\`flex justify-center items-center \${style['demo']}\`}>
        {/* this is a template */}
      </div>
    </div>
  )
}
`
const testContent = (name: string) => `
import { renderToString } from 'react-dom/server'
import { ${name} } from '..'

describe('${name} Component', () => {
  it('renders the component on the server without crashing', () => {
    const comp = renderToString(<${name}></${name}>)
    expect(comp).toBeTruthy()
  })
})
`
const styleContent = `
.demo {
}
`
const docContent = (name: string) => `{ text: '${capitalize(name)}', link: '/${name}/' },`

const defaultComponentName = 'module-component'

async function init() {
  /**
   * pnpm g test-com
   * pnpm g --c test-com
   * pnpm g --component test-com
   */
  const argComponent = formatTargetDir(argv._[0]) || argv.component || argv.c

  let targetDir = argComponent || defaultComponentName

  let result: prompts.Answers<
    'componentName' | 'overwrite' | 'test' | 'docs'
  >

  try {
    result = await prompts(
      [
        {
          type: argComponent ? null : 'text',
          name: 'componentName',
          message: reset('Component name:'),
          initial: defaultComponentName,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultComponentName
          },
        },
        {
          type: () => dirAvailable(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () => `Target directory "${targetDir}" is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: 'confirm',
          name: 'test',
          initial: true,
          message: reset('Need unit test?'),
        },
        {
          type: 'confirm',
          name: 'docs',
          initial: true,
          message: reset('Need docs?'),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        },
      },
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  // user choice associated with prompts
  const { componentName, overwrite, test, docs } = result

  const root = path.join(cwd, `components/${componentName}`)

  if (overwrite) {
    emptyComponent(componentName)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }
  fs.mkdirSync(`${root}/style`, { recursive: true })

  fs.writeFileSync(`${root}/index.tsx`, indexContent(capitalize(componentName)))
  fs.writeFileSync(`${root}/style/index.module.less`, styleContent)
  if (test) {
    fs.mkdirSync(`${root}/__test__`, { recursive: true })
    fs.mkdirSync(`${root}/__test__/__snapshots__`, { recursive: true })
    fs.writeFileSync(`${root}/__test__/index.test.tsx`, testContent(capitalize(componentName)))
  }

  if (docs) {
    updateDocs(componentName);
  }
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function updateDocs(name: string) {
  const enPath = path.join(cwd, `.vitepress/config/en.ts`);
  const zhPath = path.join(cwd, `.vitepress/config/zh.ts`);
  const enFileContent = fs.readFileSync(enPath, 'utf8');
  const zhFileContent = fs.readFileSync(zhPath, 'utf8');
  const newText = docContent(name);
  const enModifiedContent = enFileContent.replace(newText, '').replace(`text: 'Examples Components',
            items: [`, `text: 'Examples Components',
            items: [
              ${newText}`);
  const zhModifiedContent = zhFileContent.replace(newText, '').replace(`text: '组件',
            items: [`, `text: '组件',
            items: [
              ${newText}`);
  fs.writeFileSync(enPath, enModifiedContent, 'utf8');
  fs.writeFileSync(zhPath, zhModifiedContent, 'utf8');
}
function capitalize(str) {
  return str.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
function dirAvailable(p: string) {
  console.log({ p });
  try {
    const files = fs.readdirSync(`components/${p}`)
    return files.length === 0
  } catch (error) {
    return true;
  }
}

function emptyComponent(componentName: string) {
  const root = path.join(cwd, `components/${componentName}`)
  console.log('emptyComponent', fs.existsSync(root), componentName)
  if (!fs.existsSync(root)) {
    return
  }
  for (const file of fs.readdirSync(root)) {
    fs.rmSync(path.resolve(root, file), { recursive: true, force: true })
  }
}

init().catch((e) => {
  console.error(e)
})
