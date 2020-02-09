import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';


export interface VmFaultToleranceInvalidFileBacking extends VmFaultToleranceIssue {
  backingFilename?: string;
  backingType?: string;
}