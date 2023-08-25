import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import "../styles/react-live.css";
export var ReactLive = function (param) {
  var sourceCode = param.sourceCode,
    scope = param.scope,
    _param_noStyle = param.noStyle,
    noStyle = _param_noStyle === void 0 ? false : _param_noStyle;
  var importRegex = useMemo(function () {
    return /import[\s\S]*?;/g;
  }, []);
  var demoLogicCode = useMemo(
    function () {
      var _sourceCode;
      return (_sourceCode = sourceCode) === null || _sourceCode === void 0
        ? void 0
        : _sourceCode.replace(importRegex, "").trim();
    },
    [importRegex, sourceCode],
  );
  return /*#__PURE__*/ _jsx("div", {
    className: "react-live-comp-wrapper",
    children: /*#__PURE__*/ _jsx(LiveProvider, {
      code: demoLogicCode,
      scope: scope,
      noInline: true,
      children: /*#__PURE__*/ _jsxs("div", {
        className: noStyle ? "" : "react-live-comp-demo-wrapper",
        children: [
          /*#__PURE__*/ _jsx(LivePreview, {}),
          /*#__PURE__*/ _jsx(LiveError, {}),
        ],
      }),
    }),
  });
};
