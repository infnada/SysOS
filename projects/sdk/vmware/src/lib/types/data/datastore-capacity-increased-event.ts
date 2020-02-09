import {DatastoreEvent} from './datastore-event';


export interface DatastoreCapacityIncreasedEvent extends DatastoreEvent {
  newCapacity: number;
  oldCapacity: number;
}