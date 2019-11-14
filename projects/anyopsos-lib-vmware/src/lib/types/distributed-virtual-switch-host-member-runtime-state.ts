import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface DistributedVirtualSwitchHostMemberRuntimeState extends DynamicData {
  currentMaxProxySwitchPorts: Int;
}
