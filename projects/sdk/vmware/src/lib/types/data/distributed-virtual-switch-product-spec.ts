import {DynamicData} from './dynamic-data';


export interface DistributedVirtualSwitchProductSpec extends DynamicData {
  build?: string;
  bundleId?: string;
  bundleUrl?: string;
  forwardingClass?: string;
  name?: string;
  vendor?: string;
  version?: string;
}