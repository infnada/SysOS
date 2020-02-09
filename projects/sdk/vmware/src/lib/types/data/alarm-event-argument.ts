import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';

export interface AlarmEventArgument extends EntityEventArgument {
  alarm: ManagedObjectReference & { $type: 'Alarm'; };
}