import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {DateTime} from './date-time';
import {Long} from './long';

export interface GuestProcessInfo extends DynamicData {
  cmdLine?: DateTime;
  exitCode?: Int;
  name: string;
  owner: string;
  pid: Long;
  startTime: DateTime;
}
