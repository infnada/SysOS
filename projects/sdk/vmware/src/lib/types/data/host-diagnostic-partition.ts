import {DynamicData} from './dynamic-data';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';

export interface HostDiagnosticPartition extends DynamicData {
  diagnosticType: string;
  id: HostScsiDiskPartition;
  slots: number;
  storageType: string;
}