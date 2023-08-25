import { FC, useMemo } from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import "../styles/react-live.css";

export interface IReactLive {
  sourceCode?: string;
  scope?: Record<string, any>;
  noStyle?: boolean;
}

export const ReactLive: FC<IReactLive> = ({
  sourceCode,
  scope,
  noStyle = false,
}) => {
  const importRegex = useMemo(() => /import[\s\S]*?;/g, []);

  const demoLogicCode = useMemo(() => {
    return sourceCode?.replace(importRegex, "").trim();
  }, [importRegex, sourceCode]);

  return (
    <div className="react-live-comp-wrapper">
      <LiveProvider code={demoLogicCode} scope={scope} noInline>
        <div className={noStyle ? "" : "react-live-comp-demo-wrapper"}>
          <LivePreview />
          <LiveError />
        </div>
      </LiveProvider>
    </div>
  );
};
