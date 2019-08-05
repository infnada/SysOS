import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface DistributedVirtualSwitchPortConnection extends DynamicData {
  connectionCookie?: Int;
  portgroupKey?: string;
  portKey?: string;
  switchUuid: string;
}
