import {DatastoreEvent} from './datastore-event';


export interface DatastoreFileEvent extends DatastoreEvent {
  sourceOfOperation?: string;
  succeeded?: boolean;
  targetFile: string;
}