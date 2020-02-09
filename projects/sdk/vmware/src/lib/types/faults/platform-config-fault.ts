import {HostConfigFault} from './host-config-fault';


export interface PlatformConfigFault extends HostConfigFault {
  text: string;
}