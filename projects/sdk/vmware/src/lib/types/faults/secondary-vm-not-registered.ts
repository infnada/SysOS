import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';


export interface SecondaryVmNotRegistered extends VmFaultToleranceIssue {
  instanceUuid: string;
}