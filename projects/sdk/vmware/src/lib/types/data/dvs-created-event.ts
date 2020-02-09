import {DvsEvent} from './dvs-event';

import {FolderEventArgument} from './folder-event-argument';

export interface DvsCreatedEvent extends DvsEvent {
  parent: FolderEventArgument;
}