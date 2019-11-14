import {HostConnectFault} from './host-connect-fault';

export interface AlreadyConnected extends HostConnectFault {
  name: string;
}
