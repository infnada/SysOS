import {DynamicData} from './dynamic-data';


export interface DistributedVirtualSwitchPortConnection extends DynamicData {
  connectionCookie?: number;
  portgroupKey?: string;
  portKey?: string;
  switchUuid: string;
}