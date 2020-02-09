import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostInternetScsiHbaTargetSet} from '../data/host-internet-scsi-hba-target-set';
import {HostInternetScsiHbaParamValue} from '../data/host-internet-scsi-hba-param-value';


export interface UpdateInternetScsiAdvancedOptions {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  targetSet?: HostInternetScsiHbaTargetSet;
  options: HostInternetScsiHbaParamValue[];
}