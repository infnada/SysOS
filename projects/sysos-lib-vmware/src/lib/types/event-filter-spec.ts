import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {EventFilterSpecByEntity} from './event-filter-spec-by-entity';
import {EventFilterSpecByTime} from './event-filter-spec-by-time';
import {EventFilterSpecByUsername} from './event-filter-spec-by-username';
import {Int} from './int';
export interface EventFilterSpec extends DynamicData {
  alarm?: ManagedObjectReference & { $type: 'Alarm' };
  category?: string[];
  disableFullMessage?: boolean;
  entity?: EventFilterSpecByEntity;
  eventChainId?: Int;
  eventTypeId?: string[];
  maxCount?: Int;
  scheduledTask?: ManagedObjectReference & { $type: 'ScheduledTask' };
  tag?: string[];
  time?: EventFilterSpecByTime;
  type?: string[];
  userName?: EventFilterSpecByUsername;
}
