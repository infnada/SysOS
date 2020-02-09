import {DynamicData} from './dynamic-data';


export interface HostNtpConfig extends DynamicData {
  configFile?: string[];
  server?: string[];
}