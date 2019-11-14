import {DvsEvent} from './dvs-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
import {DVSConfigSpec} from './d-v-s-config-spec';
export interface DvsReconfiguredEvent extends DvsEvent {
  configChanges?: ChangesInfoEventArgument;
  configSpec: DVSConfigSpec;
}
