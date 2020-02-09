import {GatewayConnectFault} from './gateway-connect-fault';


export interface GatewayToHostConnectFault extends GatewayConnectFault {
  hostname: string;
  port?: number;
}