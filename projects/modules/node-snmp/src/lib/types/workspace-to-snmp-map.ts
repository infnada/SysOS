// @ts-ignore
import * as netSnmp from 'net-snmp';

export interface WorkspaceToSnmpMap {
  [key: string]: {
    [key: string]: {
      [key: string]: netSnmp.Session;
    };
  };
}
