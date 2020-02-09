import {AlarmSpec} from './alarm-spec';

import {ManagedObjectReference} from './managed-object-reference';

export interface AlarmInfo extends AlarmSpec {
  alarm: ManagedObjectReference & { $type: 'Alarm'; };
  creationEventId: number;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  key: string;
  lastModifiedTime: string;
  lastModifiedUser: string;
}