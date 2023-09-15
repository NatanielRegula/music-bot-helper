import config from '../../config.json';


const BdApi = new window.BdApi(config.name);
export const { UI, React, Patcher, Webpack, Data } = BdApi;


export default BdApi;