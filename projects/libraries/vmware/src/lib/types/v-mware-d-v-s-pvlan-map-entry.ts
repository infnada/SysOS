import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VMwareDVSPvlanMapEntry extends DynamicData {
  primaryVlanId: Int;
  pvlanType: string;
  secondaryVlanId: Int;
}
