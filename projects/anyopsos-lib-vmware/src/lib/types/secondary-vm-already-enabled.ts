import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

export interface SecondaryVmAlreadyEnabled extends VmFaultToleranceIssue {
  instanceUuid: string;
}
