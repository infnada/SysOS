import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface DistributedVirtualSwitchHostMemberPnicSpec extends DynamicData {
  connectionCookie?: Int;
  pnicDevice: string;
  uplinkPortgroupKey?: string;
  uplinkPortKey?: string;
}
