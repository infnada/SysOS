import {DynamicData} from './dynamic-data';


export interface VMwareDVSPvlanMapEntry extends DynamicData {
  primaryVlanId: number;
  pvlanType: string;
  secondaryVlanId: number;
}