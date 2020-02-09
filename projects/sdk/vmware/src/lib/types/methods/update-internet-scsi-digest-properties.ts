import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostInternetScsiHbaTargetSet} from '../data/host-internet-scsi-hba-target-set';
import {HostInternetScsiHbaDigestProperties} from '../data/host-internet-scsi-hba-digest-properties';


export interface UpdateInternetScsiDigestProperties {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  targetSet?: HostInternetScsiHbaTargetSet;
  digestProperties: HostInternetScsiHbaDigestProperties;
}