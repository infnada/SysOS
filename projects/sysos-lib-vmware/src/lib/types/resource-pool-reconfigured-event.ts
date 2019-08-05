import {ResourcePoolEvent} from './resource-pool-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
export interface ResourcePoolReconfiguredEvent extends ResourcePoolEvent {
  configChanges?: ChangesInfoEventArgument;
}
