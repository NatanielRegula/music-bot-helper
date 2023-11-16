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

export const LOG_LEVEL = {
  error: 'ERROR',
  info: 'INFO',
  log: 'LOG',
  warn: 'WARN',
  verbose: 'VERBOSE',
  trace: 'TRACE',
} as const;

type ObjectValues<T> = T[keyof T];

export type LogLevel = ObjectValues<typeof LOG_LEVEL>;

export class LoggerConstructor implements LoggerType {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  private formatIntro(level: LogLevel): string {
    const coloredName = `\x1b[1m\x1b[95m[${level}] [${this.name}]\x1b[0m`;

    return `${coloredName}`;
  }
  error(error: any): void {
    console.error(this.formatIntro(LOG_LEVEL.error), error);
  }

  info(info: any): void {
    console.info(this.formatIntro(LOG_LEVEL.info), info);
  }

  log(log: any): void {
    console.log(this.formatIntro(LOG_LEVEL.log), log);
  }

  warn(warning: any): void {
    console.warn(this.formatIntro(LOG_LEVEL.warn), warning);
  }

  verbose(log: any): void {
    console.log(this.formatIntro(LOG_LEVEL.verbose), log);
  }

  trace(trace: any): void {
    console.trace(this.formatIntro(LOG_LEVEL.trace), trace);
  }

  time(log: any, timeSubject: Function): void {
    const coloredName = `\x1b[32m[${this.name}]\x1b[0m`;
    console.time(`${coloredName} ${log}`);
    timeSubject();
    console.timeEnd(`${coloredName} ${log}`);
  }
}

const Logger = new LoggerConstructor(config.name);

// Logger.name = config.name;

export default Logger;
