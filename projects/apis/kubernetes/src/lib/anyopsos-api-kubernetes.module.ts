import {Controller, Get, Authorized, Req, Res, Param, Delete} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {getSocketIO} from 'socket-controllers';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {Socket} from 'socket.io';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSKubernetesModule} from '@anyopsos/module-kubernetes';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/kubernetes')
export class AnyOpsOSKubernetesApiController {

  @Get('/resource/:connectionUuid/:resourceLink(*)')
  async getKubernetesResource(@Req() request: Request,
                              @Res() response: Response,
                              @SessionParam('socketId') socketId: string,
                              @SessionParam('userUuid') userUuid: string,
                              @SessionParam('id') sessionUuid: string,
                              @Param('connectionUuid') connectionUuid: string,
                              @Param('resourceLink') resourceLink: string) {
    logger.info(`[API Kubernetes] -> Get Resource -> connectionUuid [${connectionUuid}] resource [${resourceLink}]`);

    const socket: Socket = getSocketIO().clients().sockets[socketId];
    const resourceData: string = await new AnyOpsOSKubernetesModule(socket).getResource(userUuid, sessionUuid, connectionUuid, resourceLink);

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(resourceData);
  }

  @Get('/log/:connectionUuid/:terminalUuid/:namespace/:pod/:container/:showContainerName')
  async getContainerLogs(@Req() request: Request,
                         @Res() response: Response,
                         @SessionParam('socketId') socketId: string,
                         @SessionParam('userUuid') userUuid: string,
                         @SessionParam('id') sessionUuid: string,
                         @Param('connectionUuid') connectionUuid: string,
                         @Param('terminalUuid') terminalUuid: string,
                         @Param('namespace') namespace: string,
                         @Param('pod') pod: string,
                         @Param('container') container: string,
                         @Param('showContainerName') showContainerName: boolean) {
    logger.info(`[API Kubernetes] -> Get Container Logs -> connectionUuid [${connectionUuid}] terminalUuid [${terminalUuid}] namespace [${namespace}] pod [${pod}] container [${container}] showContainerName [${showContainerName}]`);

    const socket: Socket = getSocketIO().clients().sockets[socketId];
    const logUuid: string = await new AnyOpsOSKubernetesModule(socket).getContainerLogs(userUuid, sessionUuid, connectionUuid, terminalUuid, namespace, pod, container, showContainerName);

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(logUuid);
  }

  @Delete('/log/:logUuid')
  async stopContainerLogs(@Req() request: Request,
                          @Res() response: Response,
                          @SessionParam('socketId') socketId: string,
                          @SessionParam('userUuid') userUuid: string,
                          @SessionParam('id') sessionUuid: string,
                          @Param('logUuid') logUuid: string) {
    logger.info(`[API Kubernetes] -> End Container Logs -> logUuid [${logUuid}]`);

    const socket: Socket = getSocketIO().clients().sockets[socketId];
    await new AnyOpsOSKubernetesModule(socket).finishContainerLogRequest(userUuid, sessionUuid, logUuid);

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Get('/exec/:connectionUuid/:terminalUuid/:namespace/:pod/:container/:command')
  async executeIntoContainer(@Req() request: Request,
                             @Res() response: Response,
                             @SessionParam('socketId') socketId: string,
                             @SessionParam('userUuid') userUuid: string,
                             @SessionParam('id') sessionUuid: string,
                             @Param('connectionUuid') connectionUuid: string,
                             @Param('terminalUuid') terminalUuid: string,
                             @Param('namespace') namespace: string,
                             @Param('pod') pod: string,
                             @Param('container') container: string,
                             @Param('command') command: string) {
    logger.info(`[API Kubernetes] -> Exec into Container connectionUuid [$connectionUuid}] terminalUuid [${terminalUuid}] namespace [${namespace}] pod [${pod}] container [${container}] command [${command}]`);

    const socket: Socket = getSocketIO().clients().sockets[socketId];
    await new AnyOpsOSKubernetesModule(socket).execToTerminal(userUuid, sessionUuid, connectionUuid, terminalUuid, namespace, pod, container, command);

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Get('/shell/:type/:connectionUuid/:terminalUuid/:namespace/:pod/:container/:command')
  async shellIntoContainer(@Req() request: Request,
                           @Res() response: Response,
                           @SessionParam('socketId') socketId: string,
                           @SessionParam('userUuid') userUuid: string,
                           @SessionParam('id') sessionUuid: string,
                           @Param('type') type: 'exec' | 'attach',
                           @Param('connectionUuid') connectionUuid: string,
                           @Param('terminalUuid') terminalUuid: string,
                           @Param('namespace') namespace: string,
                           @Param('pod') pod: string,
                           @Param('container') container: string,
                           @Param('command') command: string) {
    logger.info(`[API Kubernetes] -> Exec or Attach into Container type [${type}] connectionUuid [${connectionUuid}] terminalUuid [${terminalUuid}] namespace [${namespace}] pod [${pod}] container [${container}] command [${command}]`);

    const socket: Socket = getSocketIO().clients().sockets[socketId];

    if (type === 'exec') await new AnyOpsOSKubernetesModule(socket).execToTerminal(userUuid, sessionUuid, connectionUuid, terminalUuid, namespace, pod, container, command);
    if (type === 'attach') await new AnyOpsOSKubernetesModule(socket).attachToTerminal(userUuid, sessionUuid, connectionUuid, terminalUuid, namespace, pod, container);

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

  @Delete('/shell/:terminalUuid')
  async stopContainerShell(@Req() request: Request,
                           @Res() response: Response,
                           @SessionParam('socketId') socketId: string,
                           @SessionParam('userUuid') userUuid: string,
                           @SessionParam('id') sessionUuid: string,
                           @Param('terminalUuid') terminalUuid: string) {
    logger.info(`[API Kubernetes] -> End Container Shell -> terminalUuid [${terminalUuid}]`);

    const socket: Socket = getSocketIO().clients().sockets[socketId];

    new AnyOpsOSKubernetesModule(socket).finishTerminalShellRequest(userUuid, sessionUuid, terminalUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
