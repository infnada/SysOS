import {DynamicData} from './dynamic-data';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {Int} from './int';
export interface HostDiagnosticPartition extends DynamicData {
  diagnosticType: string;
  id: HostScsiDiskPartition;
  slots: Int;
  storageType: string;
}
