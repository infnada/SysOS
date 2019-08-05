import {DynamicData} from './dynamic-data';

import {HostEventArgument} from './host-event-argument';
export interface DvsOutOfSyncHostArgument extends DynamicData {
  configParamters: string[];
  outOfSyncHost: HostEventArgument;
}
