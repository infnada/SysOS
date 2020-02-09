import {DynamicData} from './dynamic-data';

import {HostDhcpServiceSpec} from './host-dhcp-service-spec';

export interface HostDhcpServiceConfig extends DynamicData {
  changeOperation?: string;
  key: string;
  spec: HostDhcpServiceSpec;
}