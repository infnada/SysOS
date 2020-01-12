import {Middleware, MiddlewareInterface} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

const logger: Logger = getLogger('mainlog');

@Middleware()
export class AnyOpsOSMainWebsocketMiddleware implements MiddlewareInterface {

  // if websocket connection arrives without an express session, kill it
  use(socket: Socket, next: ((err?: any) => any)): any {

    if (!socket.request.session) {
      logger.warn(`[Socket] -> Unauthorized -> id [${socket.id}]`);
      socket.emit('no_session');
      socket.disconnect(true);
      return next('unauthorized');
    }

    return next();
  }

}
