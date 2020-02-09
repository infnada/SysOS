import {DynamicData} from './dynamic-data';


export interface PhysicalNicLinkInfo extends DynamicData {
  duplex: boolean;
  speedMb: number;
}