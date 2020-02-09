import {DynamicData} from './dynamic-data';


export interface FcoeConfigVlanRange extends DynamicData {
  vlanHigh: number;
  vlanLow: number;
}