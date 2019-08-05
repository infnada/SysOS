import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface AutoStartDefaults extends DynamicData {
  enabled?: boolean;
  startDelay?: Int;
  stopAction?: string;
  stopDelay?: Int;
  waitForHeartbeat?: boolean;
}
