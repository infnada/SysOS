import {DatastoreEvent} from './datastore-event';

export interface DatastoreRenamedEvent extends DatastoreEvent {
  newName: string;
  oldName: string;
}
