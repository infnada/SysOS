import {DynamicData} from './dynamic-data';
import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface CheckResult extends DynamicData {
  error?: LocalizedMethodFault[];
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  vm?: ManagedObjectReference & { $type: 'VirtualMachine' };
  warning?: LocalizedMethodFault[];
}
