import {VmConfigFault} from './vm-config-fault';

export interface SoftRuleVioCorrectionImpact extends VmConfigFault {
  vmName: string;
}
