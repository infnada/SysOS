import {HostConnectFault} from './host-connect-fault';


export interface NoHost extends HostConnectFault {
  name?: string;
}