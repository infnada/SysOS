import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface HealthUpdate extends DynamicData {
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  healthUpdateInfoId: string;
  id: string;
  remediation: string;
  status: ManagedEntityStatus;
}