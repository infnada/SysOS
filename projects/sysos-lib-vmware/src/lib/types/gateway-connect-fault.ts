import {HostConnectFault} from './host-connect-fault';

import {LocalizableMessage} from './localizable-message';
export interface GatewayConnectFault extends HostConnectFault {
  details?: LocalizableMessage;
  gatewayId: string;
  gatewayInfo: string;
  gatewayType: string;
}
