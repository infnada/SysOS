import {DynamicData} from './dynamic-data';

import {DVSContactInfo} from './d-v-s-contact-info';
import {ManagedObjectReference} from './managed-object-reference';
import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';

export interface DVSSummary extends DynamicData {
  contact?: DVSContactInfo;
  description?: string;
  host?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  hostMember?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  name: string;
  numHosts?: number;
  numPorts: number;
  portgroupName?: string[];
  productInfo?: DistributedVirtualSwitchProductSpec;
  uuid: string;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
}