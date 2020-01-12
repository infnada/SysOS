import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

export interface FaultToleranceNotLicensed extends VmFaultToleranceIssue {
  hostName?: string;
}
