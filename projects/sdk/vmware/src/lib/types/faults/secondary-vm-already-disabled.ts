import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';


export interface SecondaryVmAlreadyDisabled extends VmFaultToleranceIssue {
  instanceUuid: string;
}