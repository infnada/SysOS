import {DatastoreFileEvent} from './datastore-file-event';

import {DatastoreEventArgument} from './datastore-event-argument';

export interface DatastoreFileCopiedEvent extends DatastoreFileEvent {
  sourceDatastore: DatastoreEventArgument;
  sourceFile: string;
}