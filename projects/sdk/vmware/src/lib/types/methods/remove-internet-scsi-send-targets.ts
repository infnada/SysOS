import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostInternetScsiHbaSendTarget} from '../data/host-internet-scsi-hba-send-target';


export interface RemoveInternetScsiSendTargets {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  targets: HostInternetScsiHbaSendTarget[];
}