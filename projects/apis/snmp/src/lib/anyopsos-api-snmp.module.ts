import {Controller, Get, Authorized, Req, Res, Param} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSSnmpModule, SnmpSessionsModule, SnmpIface, VarBind} from '@anyopsos/module-snmp';

const logger: Logger = getLogger('mainlog');

// TODO this is a PoC
@Authorized()
@Controller('/api/snmp')
export class AnyOpsOSSnmpApiController {

  @Get('/:type/:connectionUuid/:oid')
  getSnmp(@Req() request: Request,
          @Res() response: Response,
          @SessionParam('socketId') socketId: string,
          @SessionParam('userUuid') userUuid: string,
          @SessionParam('id') sessionUuid: string,
          @Param('type') type: string,
          @Param('connectionUuid') connectionUuid: string,
          @Param('oid') oid: string) {
    logger.info(`[API snmp] -> -> Call -> type [${type}], connectionUuid [${connectionUuid}], oid [${oid}]`);

    const snmpSession = new SnmpSessionsModule().getSession(userUuid, sessionUuid, connectionUuid);
    const snmpResponse: { oid: string; value: string; }[] = [];

    // SPECIAL FOR SONICWALL IFACES
    if (oid === 'sonicwall_ifaces') {
      const Snmp = new AnyOpsOSSnmpModule(snmpSession);

      return Snmp.getIfaces().then(() => {

        return Snmp.getIfacesIp();
      }).then((ifaces) => {

        return Promise.all(
          // @ts-ignore // TODO
          ifaces.map(
            (iface: SnmpIface) => Snmp.getIfacesInfo(iface.interfaceId, iface.ip)
          )
        );
      }).then(() => {

        return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse({
          connectionUuid,
          type: 'oid',
          data: JSON.stringify(Snmp.ifaces)
        });

      }).catch((e: Error) => {
        return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse(e);
      });

    }

    // NORMAL OID GET
    if (type === 'get') {

      snmpSession.get({ oid }, (e: Error, varbinds: VarBind[]) => {
        if (e) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse(e);

        console.log(varbinds);

        varbinds.forEach((varbind: VarBind) => {
          snmpResponse.push({
            oid: varbind.oid.join('.'),
            value: varbind.value.toString()
          });
        });

        return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse({
          connectionUuid,
          type: 'oid',
          data: snmpResponse
        });
      });
    }

    if (type === 'get-next') {

      snmpSession.getNext(oid, (e: Error, varbinds: VarBind[]) => {
        if (e) return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse(e);

        console.log(JSON.stringify(varbinds));

        varbinds.forEach((varbind: VarBind) => {
          snmpResponse.push({
            oid: varbind.oid.join('.'),
            value: varbind.value.toString()
          });
        });

        return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse({
          connectionUuid,
          type: 'oid',
          data: snmpResponse
        });
      });
    }


  }

}
