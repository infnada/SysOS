import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';


export interface InvalidOperationOnSecondaryVm extends VmFaultToleranceIssue {
  instanceUuid: string;
}