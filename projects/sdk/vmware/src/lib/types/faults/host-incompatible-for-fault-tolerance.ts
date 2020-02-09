import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';


export interface HostIncompatibleForFaultTolerance extends VmFaultToleranceIssue {
  hostName?: string;
  reason?: string;
}