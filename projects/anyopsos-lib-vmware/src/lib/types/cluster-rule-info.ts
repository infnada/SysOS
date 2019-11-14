import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from './managed-entity-status';
import {Int} from './int';
export interface ClusterRuleInfo extends DynamicData {
  enabled?: boolean;
  inCompliance?: boolean;
  key?: Int;
  mandatory?: boolean;
  name?: string;
  ruleUuid?: string;
  status?: ManagedEntityStatus;
  userCreated?: boolean;
}
