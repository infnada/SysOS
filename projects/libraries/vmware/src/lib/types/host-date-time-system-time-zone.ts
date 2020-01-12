import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostDateTimeSystemTimeZone extends DynamicData {
  description: string;
  gmtOffset: Int;
  key: string;
  name: string;
}
