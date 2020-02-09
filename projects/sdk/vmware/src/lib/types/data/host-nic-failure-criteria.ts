import {DynamicData} from './dynamic-data';


export interface HostNicFailureCriteria extends DynamicData {
  checkBeacon?: boolean;
  checkDuplex?: boolean;
  checkErrorPercent?: boolean;
  checkSpeed?: string;
  fullDuplex?: boolean;
  percentage?: number;
  speed?: number;
}