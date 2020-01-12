import {GeneralEvent} from './general-event';

import {ExtendedEventPair} from './extended-event-pair';
import {ManagedObjectReference} from './managed-object-reference';
export interface ExtendedEvent extends GeneralEvent {
  data?: ExtendedEventPair[];
  eventTypeId: string;
  managedObject: ManagedObjectReference;
}
