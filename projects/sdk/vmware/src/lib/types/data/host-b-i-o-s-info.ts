import {DynamicData} from './dynamic-data';


export interface HostBIOSInfo extends DynamicData {
  biosVersion?: string;
  firmwareMajorRelease?: number;
  firmwareMinorRelease?: number;
  majorRelease?: number;
  minorRelease?: number;
  releaseDate?: string;
  vendor?: string;
}