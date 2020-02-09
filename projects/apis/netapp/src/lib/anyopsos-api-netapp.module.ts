import {Controller, Authorized, Req, Res, BodyParam, Post, Param} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSNetappModule} from '@anyopsos/module-netapp';
import {NetappSdkFunctions, NetappSdkVfilerFunctions, NetappSdkFunctionsInput, NetappSdkVfilerFunctionsInput} from '@anyopsos/sdk-netapp';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/netapp')
export class AnyOpsOSNetappApiController {

  /**
   * Node APIs
   */
  @Post('/soap/:workspaceUuid/:connectionUuid/:vfiler?')
  async netappCallSoap(@Req() request: Request,
                       @Res() response: Response,
                       @SessionParam('userUuid') userUuid: string,
                       @SessionParam('id') sessionUuid: string,
                       @BodyParam('action') action: NetappSdkFunctions | NetappSdkVfilerFunctions,
                       @BodyParam('data') data: NetappSdkFunctionsInput<any> | NetappSdkVfilerFunctionsInput<any>,
                       @Param('workspaceUuid') workspaceUuid: string,
                       @Param('connectionUuid') connectionUuid: string,
                       @Param('vfiler', { required: false }) vfiler?: string) {
    logger.info(`[API NetApp] -> Call -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}]`);

    const NetappModule: AnyOpsOSNetappModule = new AnyOpsOSNetappModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    let soapResult: BackendResponse;

    if (vfiler) {
      soapResult = await NetappModule.callSoapApi(action as NetappSdkVfilerFunctions, data, vfiler);
    } else {
      soapResult = await NetappModule.callSoapApi(action as NetappSdkFunctions, data);
    }


    return ApiGlobalsModule.jsonDataResponse(soapResult);
  }

}
