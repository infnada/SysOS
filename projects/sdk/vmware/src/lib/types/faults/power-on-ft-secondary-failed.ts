import {VmFaultToleranceIssue} from './vm-fault-tolerance-issue';

import {LocalizedMethodFault} from '../data/localized-method-fault';
import {FtIssuesOnHostHostSelectionType} from '../enums/ft-issues-on-host-host-selection-type';
import {ManagedObjectReference} from '../data/managed-object-reference';

export interface PowerOnFtSecondaryFailed extends VmFaultToleranceIssue {
  hostErrors?: LocalizedMethodFault[];
  hostSelectionBy: FtIssuesOnHostHostSelectionType;
  rootCause: LocalizedMethodFault;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName: string;
}