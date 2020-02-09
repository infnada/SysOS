import {Event} from './event';

import {DatastoreEventArgument} from './datastore-event-argument';

export interface LockerMisconfiguredEvent extends Event {
  datastore: DatastoreEventArgument;
}