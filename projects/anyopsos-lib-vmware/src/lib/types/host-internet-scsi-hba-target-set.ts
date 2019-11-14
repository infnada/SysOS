import {DynamicData} from './dynamic-data';

import {HostInternetScsiHbaSendTarget} from './host-internet-scsi-hba-send-target';
import {HostInternetScsiHbaStaticTarget} from './host-internet-scsi-hba-static-target';
export interface HostInternetScsiHbaTargetSet extends DynamicData {
  sendTargets?: HostInternetScsiHbaSendTarget[];
  staticTargets?: HostInternetScsiHbaStaticTarget[];
}
