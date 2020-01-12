import {DynamicData} from './dynamic-data';

import {HostCapability} from './host-capability';
import {HostDatastoreConnectInfo} from './host-datastore-connect-info';
import {HostListSummary} from './host-list-summary';
import {HostLicenseConnectInfo} from './host-license-connect-info';
import {HostConnectInfoNetworkInfo} from './host-connect-info-network-info';
import {VirtualMachineSummary} from './virtual-machine-summary';
export interface HostConnectInfo extends DynamicData {
  capability?: HostCapability;
  clusterSupported?: boolean;
  datastore?: HostDatastoreConnectInfo[];
  host: HostListSummary;
  inDasCluster?: boolean;
  license?: HostLicenseConnectInfo;
  network?: HostConnectInfoNetworkInfo[];
  serverIp?: string;
  vimAccountNameRequired?: boolean;
  vm?: VirtualMachineSummary[];
}
