import {DynamicData} from './dynamic-data';


export interface PerfInterval extends DynamicData {
  enabled: boolean;
  key: number;
  length: number;
  level?: number;
  name: string;
  samplingPeriod: number;
}