import {Controller, Get, Authorized, Req, Res, BodyParam} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSCredentialModule, KdbxCredential} from '@anyopsos/module-credential';
import {AnyOpsOSNetappModule} from '@anyopsos/module-netapp';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/netapp')
export class AnyOpsOSNetappApiController {

  @Get('/')
  async callNetapp(@Req() request: Request,
                   @Res() response: Response,
                   @SessionParam('userUuid') userUuid: string,
                   @SessionParam('id') sessionUuid: string,
                   @BodyParam('credentialUuid') credentialUuid: string,
                   @BodyParam('host') host: string,
                   @BodyParam('port') port: number,
                   @BodyParam('xml') xml: string) {
    logger.info(`[API NetApp] -> Call ->  host [${host}]`);

    const callPath: string = '/servlets/netapp.servlets.admin.XMLrequest_filer';

    const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(userUuid, sessionUuid, credentialUuid);
    const netappData: any = await new AnyOpsOSNetappModule().callApi(
      host,
      port,
      credential.fields.UserName,
      credential.fields.Password.getText(),
      callPath,
      '<?xml version=\'1.0\' encoding=\'utf-8\' ?><!DOCTYPE netapp SYSTEM \'file:/etc/netapp_filer.dtd\'>' + xml
    );

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(netappData);
  }

}
