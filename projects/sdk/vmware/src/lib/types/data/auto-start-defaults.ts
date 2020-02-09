import {DynamicData} from './dynamic-data';


export interface AutoStartDefaults extends DynamicData {
  enabled?: boolean;
  startDelay?: number;
  stopAction?: string;
  stopDelay?: number;
  waitForHeartbeat?: boolean;
}