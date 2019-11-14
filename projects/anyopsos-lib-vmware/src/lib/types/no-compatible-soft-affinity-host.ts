import {VmConfigFault} from './vm-config-fault';

export interface NoCompatibleSoftAffinityHost extends VmConfigFault {
  vmName: string;
}
