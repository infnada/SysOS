import {Event} from './event';

import {DatastoreEventArgument} from './datastore-event-argument';
export interface DatastoreEvent extends Event {
  datastore?: DatastoreEventArgument;
}
