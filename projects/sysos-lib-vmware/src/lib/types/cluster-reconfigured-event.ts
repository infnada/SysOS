import {ClusterEvent} from './cluster-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
export interface ClusterReconfiguredEvent extends ClusterEvent {
  configChanges?: ChangesInfoEventArgument;
}
