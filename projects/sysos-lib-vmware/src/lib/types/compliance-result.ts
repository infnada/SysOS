import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ComplianceFailure} from './compliance-failure';
import {ManagedObjectReference} from './managed-object-reference';
export interface ComplianceResult extends DynamicData {
  checkTime?: string;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity' };
  failure?: ComplianceFailure[];
  profile?: ManagedObjectReference & { $type: 'Profile' };
}
