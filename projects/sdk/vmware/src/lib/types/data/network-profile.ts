import {ApplyProfile} from './apply-profile';

import {IpRouteProfile} from './ip-route-profile';
import {NetworkProfileDnsConfigProfile} from './network-profile-dns-config-profile';
import {DvsHostVNicProfile} from './dvs-host-v-nic-profile';
import {DvsServiceConsoleVNicProfile} from './dvs-service-console-v-nic-profile';
import {DvsProfile} from './dvs-profile';
import {HostPortGroupProfile} from './host-port-group-profile';
import {NetStackInstanceProfile} from './net-stack-instance-profile';
import {NsxHostVNicProfile} from './nsx-host-v-nic-profile';
import {PhysicalNicProfile} from './physical-nic-profile';
import {ServiceConsolePortGroupProfile} from './service-console-port-group-profile';
import {VmPortGroupProfile} from './vm-port-group-profile';
import {VirtualSwitchProfile} from './virtual-switch-profile';

export interface NetworkProfile extends ApplyProfile {
  consoleIpRouteConfig?: IpRouteProfile;
  dnsConfig?: NetworkProfileDnsConfigProfile;
  dvsHostNic?: DvsHostVNicProfile[];
  dvsServiceConsoleNic?: DvsServiceConsoleVNicProfile[];
  dvswitch?: DvsProfile[];
  hostPortGroup?: HostPortGroupProfile[];
  ipRouteConfig?: IpRouteProfile;
  netStackInstance?: NetStackInstanceProfile[];
  nsxHostNic?: NsxHostVNicProfile[];
  pnic?: PhysicalNicProfile[];
  serviceConsolePortGroup?: ServiceConsolePortGroupProfile[];
  vmPortGroup?: VmPortGroupProfile[];
  vswitch?: VirtualSwitchProfile[];
}