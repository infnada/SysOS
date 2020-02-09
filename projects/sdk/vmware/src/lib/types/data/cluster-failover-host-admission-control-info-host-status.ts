import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface ClusterFailoverHostAdmissionControlInfoHostStatus extends DynamicData {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  status: ManagedEntityStatus;
}