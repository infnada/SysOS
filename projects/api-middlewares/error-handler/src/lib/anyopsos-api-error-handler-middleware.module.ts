import {Middleware, ExpressErrorMiddlewareInterface} from 'routing-controllers';
import {Request, Response, NextFunction} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';

const logger: Logger = getLogger('mainlog');

@Middleware({ type: 'after' })
export class AnyOpsOSApiErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  public error(e: any, request: Request, response: Response, next?: NextFunction): void {

    if (!response.headersSent) {
      logger.info(`[API error-handler middleware] ${e.httpCode ? e.httpCode : 500} -> url [${request.originalUrl}] -> ${e}`);
      new AnyOpsOSApiGlobalsModule(request, response).serverError(e);
    }
  }

}
