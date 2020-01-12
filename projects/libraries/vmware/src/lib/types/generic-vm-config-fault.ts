import {VmConfigFault} from './vm-config-fault';

export interface GenericVmConfigFault extends VmConfigFault {
  reason: string;
}
