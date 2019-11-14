import {HostConfigFault} from './host-config-fault';

export interface NasConfigFault extends HostConfigFault {
  name: string;
}
