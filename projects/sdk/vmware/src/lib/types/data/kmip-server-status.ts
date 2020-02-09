import {DynamicData} from './dynamic-data';

import {KeyProviderId} from './key-provider-id';
import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface KmipServerStatus extends DynamicData {
  clusterId: KeyProviderId;
  description: string;
  name: string;
  status: ManagedEntityStatus;
}