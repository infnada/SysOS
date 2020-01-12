import {Event} from './event';

import {DatastoreEventArgument} from './datastore-event-argument';
export interface LockerReconfiguredEvent extends Event {
  newDatastore?: DatastoreEventArgument;
  oldDatastore?: DatastoreEventArgument;
}
