import {VmConfigFault} from './vm-config-fault';

export interface QuarantineModeFault extends VmConfigFault {
  faultType: string;
  vmName: string;
}
