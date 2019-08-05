import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

export interface SecondaryVmAlreadyRegistered extends VmFaultToleranceIssue {
  instanceUuid: string;
}
