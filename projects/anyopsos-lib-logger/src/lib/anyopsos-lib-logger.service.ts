import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';

import {MatSnackBar} from '@anyopsos/lib-angular-material';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibLoggerService {

  constructor(private readonly logger: NGXLogger,
              private readonly snackBar: MatSnackBar) {
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
    this.snackBar.open(message, entry, { panelClass: 'bg-success' });
  }

  warn(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.warn(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
    this.snackBar.open(message, entry, { panelClass: 'bg-warning' });
  }

  error(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.error(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
    this.snackBar.open(message, entry, { panelClass: 'bg-danger' });
  }

  fatal(entry: string, message: string, args?: IArguments, ...anything: any[]) {
    this.logger.fatal(`[${entry}] -> ${message} -> ${JSON.stringify(args)} -> ${anything}`);
    this.snackBar.open(message, entry, { panelClass: 'bg-danger' });
  }
}
