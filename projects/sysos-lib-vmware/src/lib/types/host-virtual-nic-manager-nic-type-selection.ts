import {HostVirtualNicConnection} from "./host-virtual-nic-connection";

export interface HostVirtualNicManagerNicTypeSelection {
  nicType?: string[];
  vnic: HostVirtualNicConnection;
}
