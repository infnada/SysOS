import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from './managed-entity-status';
export interface AlarmFilterSpec extends DynamicData {
  status?: ManagedEntityStatus[];
  typeEntity?: string;
  typeTrigger?: string;
}
