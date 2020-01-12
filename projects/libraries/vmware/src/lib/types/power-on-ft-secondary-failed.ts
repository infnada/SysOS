import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';
import {LocalizedMethodFault} from './localized-method-fault';
import {FtIssuesOnHostHostSelectionType} from './ft-issues-on-host-host-selection-type';
import {ManagedObjectReference} from './managed-object-reference';

export interface PowerOnFtSecondaryFailed extends VmFaultToleranceIssue {
  hostErrors?: LocalizedMethodFault[];
  hostSelectionBy: FtIssuesOnHostHostSelectionType;
  rootCause: LocalizedMethodFault;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
  vmName: string;
}
