import {DvsEvent} from './dvs-event';

import {ChangesInfoEventArgument} from './changes-info-event-argument';
export interface DvsPortReconfiguredEvent extends DvsEvent {
  configChanges?: ChangesInfoEventArgument[];
  portKey: string[];
}
