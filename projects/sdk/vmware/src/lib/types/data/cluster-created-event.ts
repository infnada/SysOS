import {ClusterEvent} from './cluster-event';

import {FolderEventArgument} from './folder-event-argument';

export interface ClusterCreatedEvent extends ClusterEvent {
  parent: FolderEventArgument;
}