import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface FcoeConfigVlanRange extends DynamicData {
  vlanHigh: Int;
  vlanLow: Int;
}
