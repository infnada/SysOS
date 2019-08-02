import {ManagedObjectReference} from "./managed-object-reference";
import {DateTime} from "./date-time";
import {AlarmSpec} from "./alarm-spec";

export interface AlarmInfo extends AlarmSpec {
  alarm: ManagedObjectReference & { $type: 'Alarm' };
  creationEventId: number;
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  key: string;
  lastModifiedTime: DateTime;
  lastModifiedUser: string;
}
