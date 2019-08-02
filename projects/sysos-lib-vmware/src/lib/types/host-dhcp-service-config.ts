import {HostDhcpServiceSpec} from "./host-dhcp-service-spec";

export interface HostDhcpServiceConfig {
  changeOperation?: string;
  key: string;
  spec: HostDhcpServiceSpec;
}
