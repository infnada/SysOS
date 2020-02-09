import {DynamicData} from './dynamic-data';

import {HostActiveDirectory} from './host-active-directory';
import {HostDateTimeConfig} from './host-date-time-config';
import {HostFirewallConfig} from './host-firewall-config';
import {KeyAnyValue} from './key-any-value';
import {HostGraphicsConfig} from './host-graphics-config';
import {HostLicenseSpec} from './host-license-spec';
import {HostMemorySpec} from './host-memory-spec';
import {HostNasVolumeConfig} from './host-nas-volume-config';
import {HostNetworkConfig} from './host-network-config';
import {HostVirtualNicManagerNicTypeSelection} from './host-virtual-nic-manager-nic-type-selection';
import {OptionValue} from './option-value';
import {HostSecuritySpec} from './host-security-spec';
import {HostServiceConfig} from './host-service-config';
import {HostStorageDeviceInfo} from './host-storage-device-info';
import {HostAccountSpec} from './host-account-spec';

export interface HostConfigSpec extends DynamicData {
  activeDirectory?: HostActiveDirectory[];
  datastorePrincipal?: string;
  datastorePrincipalPasswd?: string;
  datetime?: HostDateTimeConfig;
  firewall?: HostFirewallConfig;
  genericConfig?: KeyAnyValue[];
  graphicsConfig?: HostGraphicsConfig;
  license?: HostLicenseSpec;
  memory?: HostMemorySpec;
  nasDatastore?: HostNasVolumeConfig[];
  network?: HostNetworkConfig;
  nicTypeSelection?: HostVirtualNicManagerNicTypeSelection[];
  option?: OptionValue[];
  security?: HostSecuritySpec;
  service?: HostServiceConfig[];
  storageDevice?: HostStorageDeviceInfo;
  userAccount?: HostAccountSpec[];
  usergroupAccount?: HostAccountSpec[];
}