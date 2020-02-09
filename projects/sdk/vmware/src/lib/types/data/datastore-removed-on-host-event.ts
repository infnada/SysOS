import {HostEvent} from './host-event';

import {DatastoreEventArgument} from './datastore-event-argument';

export interface DatastoreRemovedOnHostEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}