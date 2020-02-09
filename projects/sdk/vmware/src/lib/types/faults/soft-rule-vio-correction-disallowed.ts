import {VmConfigFault} from './vm-config-fault';


export interface SoftRuleVioCorrectionDisallowed extends VmConfigFault {
  vmName: string;
}