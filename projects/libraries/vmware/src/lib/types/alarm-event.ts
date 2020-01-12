import {Event} from './event';

import {AlarmEventArgument} from './alarm-event-argument';
export interface AlarmEvent extends Event {
  alarm: AlarmEventArgument;
}
