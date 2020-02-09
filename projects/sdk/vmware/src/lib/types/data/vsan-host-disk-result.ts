import {DynamicData} from './dynamic-data';

import {HostScsiDisk} from './host-scsi-disk';
import {LocalizedMethodFault} from './localized-method-fault';

export interface VsanHostDiskResult extends DynamicData {
  degraded?: boolean;
  disk: HostScsiDisk;
  error?: LocalizedMethodFault;
  state: string;
  vsanUuid?: string;
}