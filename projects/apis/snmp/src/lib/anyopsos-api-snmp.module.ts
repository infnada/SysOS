import {Controller, Get, Authorized, Req, Res, Param} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSNodeSnmpModule} from '@anyopsos/module-node-snmp';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/snmp')
export class AnyOpsOSSnmpApiController {

  @Get('/:workspaceUuid/:connectionUuid/:oid')
  async getSnmp(@Req() request: Request,
                @Res() response: Response,
                @SessionParam('socketId') socketId: string,
                @SessionParam('userUuid') userUuid: string,
                @SessionParam('id') sessionUuid: string,
                @Param('workspaceUuid') workspaceUuid: string,
                @Param('connectionUuid') connectionUuid: string,
                @Param('oid') oid: string | string[]) {
    logger.info(`[API snmp] -> -> Call -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], oid [${oid}]`);

    const SnmpModule: AnyOpsOSNodeSnmpModule = new AnyOpsOSNodeSnmpModule(userUuid, sessionUuid, workspaceUuid, connectionUuid);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const soapResult: BackendResponse = await SnmpModule.getOid(oid);

    return ApiGlobalsModule.jsonDataResponse(soapResult);
  }

}
