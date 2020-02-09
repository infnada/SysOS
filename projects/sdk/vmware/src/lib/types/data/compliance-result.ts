import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ComplianceFailure} from './compliance-failure';

export interface ComplianceResult extends DynamicData {
  checkTime?: string;
  complianceStatus: string;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  failure?: ComplianceFailure[];
  profile?: ManagedObjectReference & { $type: 'Profile'; };
}