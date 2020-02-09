import {Controller, Get, Put, Authorized, Req, Res, BodyParam, Delete, Param, Patch} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSCredentialModule, Credential} from '@anyopsos/module-credential';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/credential')
export class AnyOpsOSCredentialApiController {

  @Get('/:workspaceUuid')
  async getAllCredentials(@Req() request: Request,
                          @Res() response: Response,
                          @SessionParam('userUuid') userUuid: string,
                          @SessionParam('id') sessionUuid: string,
                          @Param('workspaceUuid') workspaceUuid: string) {
    logger.info(`[API Credentials] -> Get credentials -> workspaceUuid [${workspaceUuid}]`);

    const CredentialModule: AnyOpsOSCredentialModule = new AnyOpsOSCredentialModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const credentials: Credential[] = await CredentialModule.getCredentials();

    return ApiGlobalsModule.jsonDataResponse(credentials);
  }

  @Put('/:workspaceUuid')
  async putCredential(@Req() request: Request,
                      @Res() response: Response,
                      @SessionParam('userUuid') userUuid: string,
                      @SessionParam('id') sessionUuid: string,
                      @BodyParam('credential') credential: Credential,
                      @Param('workspaceUuid') workspaceUuid: string) {
    logger.info(`[API Credentials] -> Put credential -> workspaceUuid [${workspaceUuid}]`);

    const CredentialModule: AnyOpsOSCredentialModule = new AnyOpsOSCredentialModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const credentialUuid: { uuid: string; } = await CredentialModule.putCredential(credential);

    return ApiGlobalsModule.jsonDataResponse(credentialUuid);
  }

  @Patch('/:workspaceUuid/:credentialUuid')
  async patchCredential(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @BodyParam('credential') credential: Credential,
                        @Param('workspaceUuid') workspaceUuid: string,
                        @Param('credentialUuid') credentialUuid: string) {
    logger.info(`[API Credentials] -> Patch credential -> workspaceUuid [${workspaceUuid}], credentialUuid [${credentialUuid}]`);

    if (!credential.uuid) throw new Error('resource_not_found');

    const CredentialModule: AnyOpsOSCredentialModule = new AnyOpsOSCredentialModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await CredentialModule.patchCredential(credentialUuid, credential);

    return ApiGlobalsModule.jsonDataResponse(credentialUuid);
  }

  @Delete('/:workspaceUuid/:credentialUuid')
  async deleteCredential(@Req() request: Request,
                         @Res() response: Response,
                         @SessionParam('userUuid') userUuid: string,
                         @SessionParam('id') sessionUuid: string,
                         @Param('credentialUuid') credentialUuid: string,
                         @Param('workspaceUuid') workspaceUuid: string) {
    logger.info(`[API Credentials] -> Delete credentials -> workspaceUuid [${workspaceUuid}], credentialUuid [${credentialUuid}]`);

    const CredentialModule: AnyOpsOSCredentialModule = new AnyOpsOSCredentialModule(userUuid, sessionUuid, workspaceUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    await CredentialModule.deleteCredential(credentialUuid);

    return ApiGlobalsModule.validResponse();
  }

}
