import {DynamicData} from './dynamic-data';

import {VsanHostConfigInfoClusterInfo} from './vsan-host-config-info-cluster-info';
import {VsanHostFaultDomainInfo} from './vsan-host-fault-domain-info';
import {ManagedObjectReference} from './managed-object-reference';
import {VsanHostConfigInfoNetworkInfo} from './vsan-host-config-info-network-info';
import {VsanHostConfigInfoStorageInfo} from './vsan-host-config-info-storage-info';
export interface VsanHostConfigInfo extends DynamicData {
  clusterInfo?: VsanHostConfigInfoClusterInfo;
  enabled?: boolean;
  faultDomainInfo?: VsanHostFaultDomainInfo;
  hostSystem?: ManagedObjectReference & { $type: 'HostSystem' };
  networkInfo?: VsanHostConfigInfoNetworkInfo;
  storageInfo?: VsanHostConfigInfoStorageInfo;
}
