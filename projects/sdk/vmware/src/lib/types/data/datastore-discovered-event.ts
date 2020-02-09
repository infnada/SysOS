import {HostEvent} from './host-event';

import {DatastoreEventArgument} from './datastore-event-argument';

export interface DatastoreDiscoveredEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}