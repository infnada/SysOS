import {VmConfigFault} from './vm-config-fault';


export interface NoCompatibleHardAffinityHost extends VmConfigFault {
  vmName: string;
}