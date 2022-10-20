# React Hook

`Hook` 是 `React 16.8` 的新增特性。它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。

本文主要介绍 React 中内置的 Hook API 的使用。

Hook API 概览：

- 基础 Hook
  - `useState`
  - `useEffect`
  - `useContext`

- 额外的 Hook
  - `useReducer`
  - `useCallback`
  - `useMemo`
  - `useRef`
  - `useImperativeHandle`
  - `useLayoutEffect`
  - `useDebugValue`
  - `useDeferredValue`
  - `useTransition`
  - `useId`
  
- Library Hooks
  - `useSyncExternalStore`
  - `useInsertionEffect`

> [🔗 官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html)

## 基础 Hook

### useState

语法：

```js
const [state, setState] = useState(initialState);
```
