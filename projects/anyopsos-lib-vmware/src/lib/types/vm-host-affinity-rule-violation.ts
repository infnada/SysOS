import {VmConfigFault} from './vm-config-fault';

export interface VmHostAffinityRuleViolation extends VmConfigFault {
  hostName: string;
  vmName: string;
}
