import { type IReactLive } from "../react-components/index";
import { type Theme, type DefaultTheme } from "vitepress";

export interface ILiveEditor extends IReactLive {
  sourceCodePath?: string;
  hideCode?: boolean;
  noStyle?: boolean;
}

export interface AdvThemeConfig extends DefaultTheme.Config {
  changelogPath?: string;
}
