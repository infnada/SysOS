import {ImConnection} from "./im-connection";

export interface ConnectionSnmp extends ImConnection {
  type: 'snmp';
  host: string;
  port: number;
  community: string;
}
