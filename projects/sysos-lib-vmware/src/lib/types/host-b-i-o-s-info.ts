import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {DateTime} from './date-time';

export interface HostBIOSInfo extends DynamicData {
  biosVersion?: Int;
  firmwareMinorRelease?: Int;
  majorRelease?: Int;
  minorRelease?: Int;
  releaseDate?: DateTime;
  vendor?: string;
}
