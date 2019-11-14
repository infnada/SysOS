import {HostEvent} from './host-event';

import {DatastoreEventArgument} from './datastore-event-argument';
export interface VMFSDatastoreExtendedEvent extends HostEvent {
  datastore: DatastoreEventArgument;
}
