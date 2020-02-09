import {HostConnectFault} from './host-connect-fault';


export interface AlreadyBeingManaged extends HostConnectFault {
  ipAddress: string;
}