import {AlarmSpec} from './alarm-spec';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
import {DateTime} from './date-time';
export interface AlarmInfo extends AlarmSpec {
  alarm: ManagedObjectReference & { $type: 'Alarm' };
  creationEventId: Int;
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  key: string;
  lastModifiedTime: DateTime;
  lastModifiedUser: string;
}
