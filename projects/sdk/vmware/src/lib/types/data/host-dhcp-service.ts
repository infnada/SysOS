import {DynamicData} from './dynamic-data';

import {HostDhcpServiceSpec} from './host-dhcp-service-spec';

export interface HostDhcpService extends DynamicData {
  key: string;
  spec: HostDhcpServiceSpec;
}