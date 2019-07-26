import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';
import snmp from 'net-snmp';

import {ApiGlobalsModule} from './api-globals';
import {SnmpSessionsModule} from '../../socket/modules/snmp/snmp-sessions';
import {SnmpModule} from '../modules/node/snmp';

const logger = getLogger('mainlog');
const router = Router();

/**
 * Call
 */
router.get('/:type/:uuid/:oid', (req: express.Request, res: express.Response) => {
  logger.info(`[API SNMP] -> Call -> type [${req.params.type}], uuid [${req.params.uuid}], oid [${req.params.oid}]`);

  if (!Array.isArray(req.params.oid)) req.params.oid = [req.params.oid];

  const apiGlobals = new ApiGlobalsModule(req, res);
  const snmpSessions = new SnmpSessionsModule();

  const Connection = snmpSessions.getSession('smanager', req.params.uuid);

  const response = [];

  // SPECIAL FOR SONICWALL IFACES
  if (req.params.oid === 'sonicwall_ifaces') {
    const Snmp = new SnmpModule(Connection);

    return Snmp.getIfaces().then(() => {

      return Snmp.getIfacesIp();
    }).then(() => {

      return Promise.all(
        Snmp.ifaces.map(
          (iface) => snmp.getIfacesInfo(iface.interfaceId, iface.ip)
        )
      );
    }).then(() => {

      return apiGlobals.responseJsonData({
        uuid: req.params.uuid,
        type: 'oid',
        data: `"${JSON.stringify(Snmp.ifaces)}"`
      });

    }).catch((e) => {
      return apiGlobals.serverError(e);
    });

  }

  // NORMAL OID GET
  if (req.params.type === 'get') {

    Connection.get(req.params.oid, (e, varbinds) => {
      if (e) return apiGlobals.serverError(e);

      console.log('---------');
      console.log(req.params.oid);
      console.log(varbinds);

      for (const varbind of varbinds) {
        if (snmp.isVarbindError(varbind)) {
          console.error(snmp.varbindError(varbind));
        } else {
          if (Buffer.isBuffer(varbind.value)) {
            console.log(varbind.oid + ':' + varbind.value.toString('utf8'));
          } else {
            console.log(varbind.oid + ':' + varbind.value);
          }

          response.push({
            oid: varbind.oid,
            value: varbind.value.toString()
          });
        }
      }

      return apiGlobals.responseJsonData({
        uuid: req.params.uuid,
        type: 'oid',
        data: response
      });
    });
  }

  if (req.params.type === 'get-next') {

    Connection.getNext(req.params.oid, (e, varbinds) => {
      if (e) return apiGlobals.serverError(e);

      console.log('---------');
      console.log(req.params.oid);
      console.log(JSON.stringify(varbinds));

      for (const varbind of varbinds) {
        if (snmp.isVarbindError(varbind)) {
          console.error(snmp.varbindError(varbind));
        } else {
          if (Buffer.isBuffer(varbind.value)) {
            console.log(varbind.oid + ':' + varbind.value.toString('utf8'));
          } else {
            console.log(varbind.oid + ':' + varbind.value);
          }

          response.push({
            oid: varbind.oid,
            value: varbind.value.toString()
          });
        }
      }

      return apiGlobals.responseJsonData({
        uuid: req.params.uuid,
        type: 'oid',
        data: response
      });
    });
  }

});

export default router;
