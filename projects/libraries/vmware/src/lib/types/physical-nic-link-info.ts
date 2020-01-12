import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface PhysicalNicLinkInfo extends DynamicData {
  duplex: boolean;
  speedMb: Int;
}
