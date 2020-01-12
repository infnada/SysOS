import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface PerfInterval extends DynamicData {
  enabled: boolean;
  key: Int;
  length: Int;
  level?: Int;
  name: string;
  samplingPeriod: Int;
}
