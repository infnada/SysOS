import {GatewayToHostConnectFault} from './gateway-to-host-connect-fault';


export interface GatewayToHostAuthFault extends GatewayToHostConnectFault {
  invalidProperties: string[];
  missingProperties: string[];
}