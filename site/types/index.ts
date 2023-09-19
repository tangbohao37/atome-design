import { type DefaultTheme } from 'vitepress'
import { type IReactLive } from '../react-components/index'

export interface ILiveEditor extends IReactLive {
  sourceCodePath?: string
  hideCode?: boolean
  noStyle?: boolean
}

export interface AdvThemeConfig extends DefaultTheme.Config {
  changelogPath?: string
}
