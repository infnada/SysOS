import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostNicFailureCriteria extends DynamicData {
  checkBeacon?: boolean;
  checkDuplex?: boolean;
  checkErrorPercent?: boolean;
  checkSpeed?: string;
  fullDuplex?: boolean;
  percentage?: Int;
  speed?: Int;
}
