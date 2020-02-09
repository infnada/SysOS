import {DynamicData} from './dynamic-data';

import {HostInternetScsiHbaIscsiIpv6Address} from './host-internet-scsi-hba-iscsi-ipv6address';

export interface HostInternetScsiHbaIPv6Properties extends DynamicData {
  ipv6DefaultGateway?: string;
  ipv6DhcpConfigurationEnabled?: boolean;
  ipv6LinkLocalAutoConfigurationEnabled?: boolean;
  ipv6RouterAdvertisementConfigurationEnabled?: boolean;
  iscsiIpv6Address?: HostInternetScsiHbaIscsiIpv6Address[];
}