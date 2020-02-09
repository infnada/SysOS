import {DynamicData} from './dynamic-data';


export interface PerfSampleInfo extends DynamicData {
  interval: number;
  timestamp: string;
}