import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface PhysicalNicHint extends DynamicData {
  vlanId?: Int;
}
