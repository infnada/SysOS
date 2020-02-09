import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostInternetScsiHbaIPProperties} from '../data/host-internet-scsi-hba-i-p-properties';


export interface UpdateInternetScsiIPProperties {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  ipProperties: HostInternetScsiHbaIPProperties;
}