import BdApi from './bdApi';
import config from '../../config.json';

type LoggerType = {
  error: (error: any) => void;
  info: (info: any) => void;
  log: (log: any) => void;
  warn: (warning: any) => void;
  verbose: (log: any) => void;
  trace: (trace: any) => void;
  time: (log: any, timeSubject: Function) => void;
  name: string;
};

const Logger: LoggerType = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('logger')
).logger;

Logger.name = config.name;

export default Logger;
