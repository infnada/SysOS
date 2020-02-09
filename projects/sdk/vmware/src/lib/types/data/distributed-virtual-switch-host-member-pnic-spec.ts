import {DynamicData} from './dynamic-data';


export interface DistributedVirtualSwitchHostMemberPnicSpec extends DynamicData {
  connectionCookie?: number;
  pnicDevice: string;
  uplinkPortgroupKey?: string;
  uplinkPortKey?: string;
}