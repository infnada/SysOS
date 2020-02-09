import {DynamicData} from './dynamic-data';


export interface GuestProcessInfo extends DynamicData {
  cmdLine: string;
  endTime?: string;
  exitCode?: number;
  name: string;
  owner: string;
  pid: number;
  startTime: string;
}