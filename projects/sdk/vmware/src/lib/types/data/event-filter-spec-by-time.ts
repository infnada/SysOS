import {DynamicData} from './dynamic-data';


export interface EventFilterSpecByTime extends DynamicData {
  beginTime?: string;
  endTime?: string;
}