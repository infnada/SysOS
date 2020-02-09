import {DynamicData} from './dynamic-data';


export interface SystemEventInfo extends DynamicData {
  message: string;
  recordId: number;
  selType: number;
  sensorNumber: number;
  when: string;
}