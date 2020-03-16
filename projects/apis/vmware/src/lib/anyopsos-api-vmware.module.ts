import {Controller, Authorized, Req, Res, Post, BodyParam, Param} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSNodeVmwareModule, AnyOpsOSNodeVmwareFileSystemModule} from '@anyopsos/module-node-vmware';
import {VmwareSdkFunctions, VmwareSdkFunctionsInput} from '@anyopsos/sdk-vmware';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/vmware')
export class AnyOpsOSVmwareApiController {

  /**
   * Node info
   */
  @Post('/getClientVersion/:workspaceUuid/:connectionUuid')
  async getVmwareClientVersion(@Req() request: Request,
                               @Res() response: Response,
                               @SessionParam('userUuid') userUuid: string,
                               @SessionParam('id') sessionUuid: string,
                               @Param('workspaceUuid') workspaceUuid: string,
                               @Param('connectionUuid') connectionUuid: string) {
    logger.info(`[API VMWare] -> getClientVersion -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}]`);

    const VmwareModule: AnyOpsOSNodeVmwareModule = new AnyOpsOSNodeVmwareModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const clientVersion: BackendResponse = await VmwareModule.getClientVersion();

    return ApiGlobalsModule.jsonDataResponse(clientVersion);
  }

  /**
   * Node APIs
   */
  @Post('/rest/:workspaceUuid/:connectionUuid')
  async vmwareCallRest(@Req() request: Request,
                       @Res() response: Response,
                       @SessionParam('userUuid') userUuid: string,
                       @SessionParam('id') sessionUuid: string,
                       @BodyParam('apiPath') apiPath: string,
                       @Param('workspaceUuid') workspaceUuid: string,
                       @Param('connectionUuid') connectionUuid: string) {
    logger.info(`[API VMWare] -> call -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], apiPath [${apiPath}]`);

    const VmwareModule: AnyOpsOSNodeVmwareModule = new AnyOpsOSNodeVmwareModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const restResult: BackendResponse = await VmwareModule.callRestApi(apiPath);

    return ApiGlobalsModule.jsonDataResponse(restResult);
  }

  @Post('/soap/:workspaceUuid/:connectionUuid')
  async vmwareCallSoap(@Req() request: Request,
                       @Res() response: Response,
                       @SessionParam('userUuid') userUuid: string,
                       @SessionParam('id') sessionUuid: string,
                       @BodyParam('action') action: VmwareSdkFunctions,
                       // @ts-ignore TODO
                       @BodyParam('data') data: VmwareSdkFunctionsInput<any>,
                       @Param('workspaceUuid') workspaceUuid: string,
                       @Param('connectionUuid') connectionUuid: string) {
    logger.info(`[API VMWare] -> call -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], action [${action}]`);

    const VmwareModule: AnyOpsOSNodeVmwareModule = new AnyOpsOSNodeVmwareModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    // @ts-ignore TODO
    const soapResult: BackendResponse = await VmwareModule.callSoapApi(action, data);

    return ApiGlobalsModule.jsonDataResponse(soapResult);
  }

  /**
   * File-System
   */
  @Post('/upload_to_datastore/:workspaceUuid/:connectionUuid')
  async uploadToDatastore(@Req() request: Request,
                          @Res() response: Response,
                          @SessionParam('userUuid') userUuid: string,
                          @SessionParam('id') sessionUuid: string,
                          @BodyParam('dstPath') dstPath: string,
                          @BodyParam('datastoreUrl') datastoreUrl: string,
                          @Param('workspaceUuid') workspaceUuid: string,
                          @Param('connectionUuid') connectionUuid: string) {
    logger.info(`[API VMWare] -> uploadToDatastore -> Uploading file to datastore -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], dstPath [${dstPath}], datastoreUrl [${datastoreUrl}]`);

    const VmwareFileSystemModule: AnyOpsOSNodeVmwareFileSystemModule = new AnyOpsOSNodeVmwareFileSystemModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await VmwareFileSystemModule.uploadToDatastore(dstPath, datastoreUrl);

    return ApiGlobalsModule.validResponse();
  }

}
