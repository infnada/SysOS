import {DynamicData} from './dynamic-data';

import {DVPortSetting} from './d-v-port-setting';
import {DVPortgroupPolicy} from './d-v-portgroup-policy';
import {ManagedObjectReference} from './managed-object-reference';
import {DistributedVirtualSwitchKeyedOpaqueBlob} from './distributed-virtual-switch-keyed-opaque-blob';

export interface DVPortgroupConfigSpec extends DynamicData {
  autoExpand?: boolean;
  configVersion?: string;
  defaultPortConfig?: DVPortSetting;
  description?: string;
  name?: string;
  numPorts?: number;
  policy?: DVPortgroupPolicy;
  portNameFormat?: string;
  scope?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
  type?: string;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  vmVnicNetworkResourcePoolKey?: string;
}