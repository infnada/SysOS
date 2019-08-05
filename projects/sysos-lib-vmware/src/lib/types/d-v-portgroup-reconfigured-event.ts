import {DVPortgroupEvent} from './d-v-portgroup-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
import {DVPortgroupConfigSpec} from './d-v-portgroup-config-spec';
export interface DVPortgroupReconfiguredEvent extends DVPortgroupEvent {
  configChanges?: ChangesInfoEventArgument;
  configSpec: DVPortgroupConfigSpec;
}
