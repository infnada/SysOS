import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostInternetScsiHbaStaticTarget} from '../data/host-internet-scsi-hba-static-target';


export interface AddInternetScsiStaticTargets {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  targets: HostInternetScsiHbaStaticTarget[];
}