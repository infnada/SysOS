import {AlarmEventArgument} from "./alarm-event-argument";

export interface AlarmEvent extends Event {
  alarm: AlarmEventArgument;
}
