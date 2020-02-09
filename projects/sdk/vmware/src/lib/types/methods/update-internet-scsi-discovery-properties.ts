import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostInternetScsiHbaDiscoveryProperties} from '../data/host-internet-scsi-hba-discovery-properties';


export interface UpdateInternetScsiDiscoveryProperties {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  discoveryProperties: HostInternetScsiHbaDiscoveryProperties;
}