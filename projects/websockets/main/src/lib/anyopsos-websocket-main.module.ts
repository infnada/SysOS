import {SocketController, SocketId, OnConnect, OnDisconnect} from 'socket-controllers';
import {getLogger, Logger} from 'log4js';

const logger: Logger = getLogger('mainLog');

@SocketController()
export class AnyOpsOSMainWebsocketController {

  @OnConnect()
  connection(@SocketId() id: string) {
    logger.info(`[Socket] -> Connected id [${id}]`);
  }

  @OnDisconnect()
  disconnect(@SocketId() id: string) {
    logger.warn(`[Socket] -> Disconnect id [${id}]`);
  }

  // TODO socket on error?

}
