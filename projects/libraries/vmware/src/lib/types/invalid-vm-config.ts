import {VmConfigFault} from './vm-config-fault';

export interface InvalidVmConfig extends VmConfigFault {
  property?: string;
}
