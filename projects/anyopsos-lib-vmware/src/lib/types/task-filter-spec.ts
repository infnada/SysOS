import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {TaskFilterSpecByEntity} from './task-filter-spec-by-entity';
import {TaskInfoState} from './task-info-state';
import {TaskFilterSpecByTime} from './task-filter-spec-by-time';
import {TaskFilterSpecByUsername} from './task-filter-spec-by-username';
import {Int} from './int';
export interface TaskFilterSpec extends DynamicData {
  activationId?: string[];
  alarm?: ManagedObjectReference & { $type: 'Alarm' };
  entity?: TaskFilterSpecByEntity;
  eventChainId?: Int[];
  parentTaskKey?: string[];
  rootTaskKey?: string[];
  scheduledTask?: ManagedObjectReference & { $type: 'ScheduledTask' };
  state?: TaskInfoState[];
  tag?: string[];
  time?: TaskFilterSpecByTime;
  userName?: TaskFilterSpecByUsername;
}
