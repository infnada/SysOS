import {DynamicData} from './dynamic-data';

import {DVSContactInfo} from './d-v-s-contact-info';
import {DVPortSetting} from './d-v-port-setting';
import {DVSHealthCheckConfig} from './d-v-s-health-check-config';
import {DistributedVirtualSwitchHostMember} from './distributed-virtual-switch-host-member';
import {DvsHostInfrastructureTrafficResource} from './dvs-host-infrastructure-traffic-resource';
import {DVSPolicy} from './d-v-s-policy';
import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';
import {ManagedObjectReference} from './managed-object-reference';
import {DVSUplinkPortPolicy} from './d-v-s-uplink-port-policy';
import {DistributedVirtualSwitchKeyedOpaqueBlob} from './distributed-virtual-switch-keyed-opaque-blob';
import {DVSVmVnicNetworkResourcePool} from './d-v-s-vm-vnic-network-resource-pool';

export interface DVSConfigInfo extends DynamicData {
  configVersion: string;
  contact: DVSContactInfo;
  createTime: string;
  defaultPortConfig: DVPortSetting;
  defaultProxySwitchMaxNumPorts?: number;
  description?: string;
  extensionKey?: string;
  healthCheckConfig?: DVSHealthCheckConfig[];
  host?: DistributedVirtualSwitchHostMember[];
  infrastructureTrafficResourceConfig?: DvsHostInfrastructureTrafficResource[];
  maxPorts: number;
  name: string;
  netResourcePoolTrafficResourceConfig?: DvsHostInfrastructureTrafficResource[];
  networkResourceControlVersion?: string;
  networkResourceManagementEnabled: boolean;
  numPorts: number;
  numStandalonePorts: number;
  pnicCapacityRatioForReservation?: number;
  policy?: DVSPolicy;
  productInfo: DistributedVirtualSwitchProductSpec;
  switchIpAddress?: string;
  targetInfo?: DistributedVirtualSwitchProductSpec;
  uplinkPortgroup?: ManagedObjectReference & { $type: 'DistributedVirtualPortgroup[]'; };
  uplinkPortPolicy: DVSUplinkPortPolicy;
  uuid: string;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
  vmVnicNetworkResourcePool?: DVSVmVnicNetworkResourcePool[];
}