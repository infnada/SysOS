import {Middleware, ExpressMiddlewareInterface} from 'routing-controllers';
import {Request, Response, NextFunction} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';

const logger: Logger = getLogger('mainlog');

@Middleware({ type: 'after' })
export class AnyOpsOSApiFinalMiddleware implements ExpressMiddlewareInterface {

  public use(request: Request, response: Response, next?: NextFunction): void {

    if (!response.headersSent) {
      logger.info(`[API final middleware] 404 -> url [${request.originalUrl}]`);
      new AnyOpsOSApiGlobalsModule(request, response).notFound();
    }
  }

}
