import {Controller, Get, Put, Authorized, Req, Res, BodyParam, Delete, Param, Patch} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSCredentialModule, Credential} from '@anyopsos/module-credential';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/credential')
export class AnyOpsOSCredentialApiController {

  @Get('/')
  async getAllCredentials(@Req() request: Request,
                          @Res() response: Response,
                          @SessionParam('userUuid') userUuid: string,
                          @SessionParam('id') sessionUuid: string) {
    logger.info(`[API Credentials] -> Get credentials`);

    const credentials: Credential[] = await new AnyOpsOSCredentialModule().getCredentials(userUuid, sessionUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(credentials);
  }

  @Put('/')
  async putCredential(@Req() request: Request,
                      @Res() response: Response,
                      @SessionParam('userUuid') userUuid: string,
                      @SessionParam('id') sessionUuid: string,
                      @BodyParam('credential') credential: Credential) {
    logger.info(`[API Credentials] -> Save credentials`);

    const credentialUuid: { uuid: string; } = await new AnyOpsOSCredentialModule().newCredential(userUuid, sessionUuid, credential);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(credentialUuid);
  }

  @Patch('/')
  async patchCredential(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @BodyParam('credential') credential: Credential) {
    logger.info(`[API Credentials] -> Update credentials`);

    if (!credential.uuid) throw new Error('resource_not_found');

    const credentialUuid: { uuid: string; } = await new AnyOpsOSCredentialModule().editCredential(userUuid, sessionUuid, credential);
    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(credentialUuid);
  }

  @Delete('/:credentialUuid')
  async deleteCredential(@Req() request: Request,
                         @Res() response: Response,
                         @SessionParam('userUuid') userUuid: string,
                         @SessionParam('id') sessionUuid: string,
                         @Param('credentialUuid') credentialUuid: string) {
    logger.info(`[API Credentials] -> Delete credentials -> uuid [${credentialUuid}]`);

    await new AnyOpsOSCredentialModule().deleteCredential(userUuid, sessionUuid, credentialUuid);
    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
