import {HostDnsConfig} from './host-dns-config';

import {HostVirtualNicConnection} from './host-virtual-nic-connection';
export interface HostDnsConfigSpec extends HostDnsConfig {
  virtualNicConnection?: HostVirtualNicConnection;
}
