import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class SysosLibLoggerService {

  constructor(private logger: NGXLogger) {
  }


  trace(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.trace(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
  }

  debug(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.debug(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
  }

  info(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.info(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
  }

  log(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.log(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
  }

  warn(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.warn(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
  }

  error(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.error(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
  }

  fatal(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.fatal(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
  }
}
