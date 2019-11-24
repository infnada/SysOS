import {ImConnection} from './im-connection';
import {ImDataObject} from '../im-data-object';

export interface ConnectionSnmp extends ImConnection {
  type: 'snmp';
  host: string;
  port: number;
  community: string;
  data: {
    Data: ImDataObject[]
  }
}
