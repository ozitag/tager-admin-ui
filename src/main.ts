import "./assets/css/index.css";

import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

export { default as BaseButton } from "./components/BaseButton";
export { default as BaseCheckbox } from "./components/BaseCheckbox";
export { default as BaseInput } from "./components/BaseInput";

export { AdminUiPlugin } from "./plugin";

export * from "./utils/common";

export { default as useCopyToClipboard } from "./hooks/useCopyToClipboard";
export { default as useOnClickOutside } from "./hooks/useOnClickOutside";
export { default as useResizeObserver } from "./hooks/useResizeObserver";
export { default as useLocalStorage } from "./hooks/useLocalStorage";
