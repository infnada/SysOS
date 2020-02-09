import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';

export interface IoFilterHostIssue extends DynamicData {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  issue: LocalizedMethodFault[];
}