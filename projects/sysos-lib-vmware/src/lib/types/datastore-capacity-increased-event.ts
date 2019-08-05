import {DatastoreEvent} from './datastore-event';
import {Long} from './long';

export interface DatastoreCapacityIncreasedEvent extends DatastoreEvent {
  newCapacity: Long;
  oldCapacity: Long;
}
