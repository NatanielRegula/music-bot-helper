import * as RealReact from 'react';
import config from '../../config.json';

const BdApi = new window.BdApi(config.name);

export const { UI, Patcher, Webpack, Data } = BdApi;

export const React: typeof RealReact = BdApi.React;

export const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useSyncExternalStore,
  useTransition,
} = React;

export default BdApi;
