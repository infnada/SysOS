import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';

export interface ScheduledTaskEventArgument extends EntityEventArgument {
  scheduledTask: ManagedObjectReference & { $type: 'ScheduledTask'; };
}