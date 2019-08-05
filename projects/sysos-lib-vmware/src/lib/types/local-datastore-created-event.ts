import {HostEvent} from './host-event';

import {DatastoreEventArgument} from './datastore-event-argument';
export interface LocalDatastoreCreatedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
  datastoreUrl?: string;
}
