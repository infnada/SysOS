import {HostEvent} from './host-event';

import {DatastoreEventArgument} from './datastore-event-argument';
export interface VMFSDatastoreExpandedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}
