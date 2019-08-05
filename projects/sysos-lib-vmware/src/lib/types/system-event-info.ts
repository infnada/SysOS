import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface SystemEventInfo extends DynamicData {
  message: string;
  recordId: Long;
  selType: Long;
  sensorNumber: Long;
  when: string;
}
