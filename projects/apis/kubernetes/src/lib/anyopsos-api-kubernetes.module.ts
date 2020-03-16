import {Controller, Get, Authorized, Req, Res, Param, Delete} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSNodeKubernetesModule} from '@anyopsos/module-node-kubernetes';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/kubernetes')
export class AnyOpsOSKubernetesApiController {

  @Get('/resource/:workspaceUuid/:connectionUuid/:resourceLink(*)')
  async getKubernetesResource(@Req() request: Request,
                              @Res() response: Response,
                              @SessionParam('socketId') socketId: string,
                              @SessionParam('userUuid') userUuid: string,
                              @SessionParam('id') sessionUuid: string,
                              @Param('workspaceUuid') workspaceUuid: string,
                              @Param('connectionUuid') connectionUuid: string,
                              @Param('resourceLink') resourceLink: string) {
    logger.info(`[API Kubernetes] -> Get Resource -> connectionUuid [${connectionUuid}] resource [${resourceLink}]`);

    const KubernetesModule: AnyOpsOSNodeKubernetesModule = new AnyOpsOSNodeKubernetesModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const resourceData: string = await KubernetesModule.getResource(resourceLink);

    return ApiGlobalsModule.jsonDataResponse(resourceData);
  }

  /**
   * Container Logs
   */
  @Get('/log/:workspaceUuid/:connectionUuid/:terminalUuid/:namespace/:pod/:container/:showContainerName')
  async getContainerLogs(@Req() request: Request,
                         @Res() response: Response,
                         @SessionParam('socketId') socketId: string,
                         @SessionParam('userUuid') userUuid: string,
                         @SessionParam('id') sessionUuid: string,
                         @Param('workspaceUuid') workspaceUuid: string,
                         @Param('connectionUuid') connectionUuid: string,
                         @Param('terminalUuid') terminalUuid: string,
                         @Param('namespace') namespace: string,
                         @Param('pod') pod: string,
                         @Param('container') container: string,
                         @Param('showContainerName') showContainerName: boolean) {
    logger.info(`[API Kubernetes] -> Get Container Logs -> connectionUuid [${connectionUuid}] terminalUuid [${terminalUuid}] namespace [${namespace}] pod [${pod}] container [${container}] showContainerName [${showContainerName}]`);

    const KubernetesModule: AnyOpsOSNodeKubernetesModule = new AnyOpsOSNodeKubernetesModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const logUuid: string = await KubernetesModule.getContainerLogs(terminalUuid, namespace, pod, container, showContainerName);

    return ApiGlobalsModule.jsonDataResponse(logUuid);
  }

  /**
   * Container exec/attach
   */
  @Get('/:workspaceUuid/:connectionUuid/:type/:terminalUuid/:namespace/:pod/:container/:command')
  async shellIntoContainer(@Req() request: Request,
                           @Res() response: Response,
                           @SessionParam('socketId') socketId: string,
                           @SessionParam('userUuid') userUuid: string,
                           @SessionParam('id') sessionUuid: string,
                           @Param('workspaceUuid') workspaceUuid: string,
                           @Param('connectionUuid') connectionUuid: string,
                           @Param('type') type: 'exec' | 'attach',
                           @Param('terminalUuid') terminalUuid: string,
                           @Param('namespace') namespace: string,
                           @Param('pod') pod: string,
                           @Param('container') container: string,
                           @Param('command') command: string) {
    logger.info(`[API Kubernetes] -> Exec or Attach into Container connectionUuid [${connectionUuid}] type [${type}] terminalUuid [${terminalUuid}] namespace [${namespace}] pod [${pod}] container [${container}] command [${command}]`);

    const KubernetesModule: AnyOpsOSNodeKubernetesModule = new AnyOpsOSNodeKubernetesModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    if (type === 'exec') await KubernetesModule.execToTerminal(terminalUuid, namespace, pod, container, command);
    if (type === 'attach') await KubernetesModule.attachToTerminal(terminalUuid, namespace, pod, container);

    return ApiGlobalsModule.validResponse();
  }

}
