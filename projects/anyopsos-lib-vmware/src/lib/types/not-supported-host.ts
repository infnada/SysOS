import {HostConnectFault} from './host-connect-fault';

export interface NotSupportedHost extends HostConnectFault {
  productName?: string;
  productVersion?: string;
}
