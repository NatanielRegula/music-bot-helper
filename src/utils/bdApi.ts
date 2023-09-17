import { useState as realUseState } from 'react';
import config from '../../config.json';

const BdApi = new window.BdApi(config.name);
export const { UI, React, Patcher, Webpack, Data } = BdApi;

export const useState: typeof realUseState = BdApi.React.useState;

export default BdApi;
