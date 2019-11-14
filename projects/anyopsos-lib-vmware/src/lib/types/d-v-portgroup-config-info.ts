import {DynamicData} from './dynamic-data';

import {DVPortSetting} from './d-v-port-setting';
import {ManagedObjectReference} from './managed-object-reference';
import {DVPortgroupPolicy} from './d-v-portgroup-policy';
import {DistributedVirtualSwitchKeyedOpaqueBlob} from './distributed-virtual-switch-keyed-opaque-blob';
import {Int} from './int';
export interface DVPortgroupConfigInfo extends DynamicData {
  autoExpand?: boolean;
  configVersion?: string;
  defaultPortConfig?: DVPortSetting;
  description?: string;
  distributedVirtualSwitch?: ManagedObjectReference & { $type: 'DistributedVirtualSwitch' };
  key: string;
  name: string;
  numPorts: Int;
  policy: DVPortgroupPolicy;
  portNameFormat?: string;
  scope?: ManagedObjectReference[] & { $type: 'ManagedEntity' };
  type: string;
  uplink?: boolean;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  vmVnicNetworkResourcePoolKey?: string;
}
