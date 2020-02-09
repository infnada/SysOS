import {HostConfigFault} from './host-config-fault';


export interface VmfsMountFault extends HostConfigFault {
  uuid: string;
}