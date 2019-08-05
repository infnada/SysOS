import {HostEvent} from './host-event';

import {DatastoreEventArgument} from './datastore-event-argument';
export interface VMFSDatastoreCreatedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
  datastoreUrl?: string;
}
