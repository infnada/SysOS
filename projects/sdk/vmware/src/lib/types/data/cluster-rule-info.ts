import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface ClusterRuleInfo extends DynamicData {
  enabled?: boolean;
  inCompliance?: boolean;
  key?: number;
  mandatory?: boolean;
  name?: string;
  ruleUuid?: string;
  status?: ManagedEntityStatus;
  userCreated?: boolean;
}