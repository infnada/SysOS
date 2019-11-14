import {DatacenterEvent} from './datacenter-event';

import {FolderEventArgument} from './folder-event-argument';
export interface DatacenterCreatedEvent extends DatacenterEvent {
  parent: FolderEventArgument;
}
