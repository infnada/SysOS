import {DynamicData} from './dynamic-data';


export interface HostDateTimeSystemTimeZone extends DynamicData {
  description: string;
  gmtOffset: number;
  key: string;
  name: string;
}