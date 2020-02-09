import {DynamicData} from './dynamic-data';


export interface VchaClusterConfigSpec extends DynamicData {
  passiveIp: string;
  witnessIp: string;
}