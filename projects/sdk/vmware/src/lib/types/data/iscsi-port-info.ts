import {DynamicData} from './dynamic-data';

import {IscsiStatus} from './iscsi-status';
import {PhysicalNic} from './physical-nic';
import {HostVirtualNic} from './host-virtual-nic';

export interface IscsiPortInfo extends DynamicData {
  complianceStatus?: IscsiStatus;
  externalId?: string;
  opaqueNetworkId?: string;
  opaqueNetworkName?: string;
  opaqueNetworkType?: string;
  pathStatus?: string;
  pnic?: PhysicalNic;
  pnicDevice?: string;
  portgroupKey?: string;
  portgroupName?: string;
  portKey?: string;
  switchName?: string;
  switchUuid?: string;
  vnic?: HostVirtualNic;
  vnicDevice?: string;
}