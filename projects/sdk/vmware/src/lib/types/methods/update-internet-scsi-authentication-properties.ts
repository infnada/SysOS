import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostInternetScsiHbaAuthenticationProperties} from '../data/host-internet-scsi-hba-authentication-properties';
import {HostInternetScsiHbaTargetSet} from '../data/host-internet-scsi-hba-target-set';


export interface UpdateInternetScsiAuthenticationProperties {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  authenticationProperties: HostInternetScsiHbaAuthenticationProperties;
  targetSet?: HostInternetScsiHbaTargetSet;
}