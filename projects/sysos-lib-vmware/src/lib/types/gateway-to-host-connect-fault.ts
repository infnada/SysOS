import {GatewayConnectFault} from './gateway-connect-fault';
import {Int} from './int';

export interface GatewayToHostConnectFault extends GatewayConnectFault {
  hostname: string;
  port?: Int;
}
