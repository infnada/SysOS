import {DynamicData} from './dynamic-data';

import {HostScsiDisk} from './host-scsi-disk';
export interface HostDiagnosticPartitionCreateOption extends DynamicData {
  diagnosticType: string;
  disk: HostScsiDisk;
  storageType: string;
}
