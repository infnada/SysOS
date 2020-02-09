import {DynamicData} from './dynamic-data';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {HostDiskPartitionSpec} from './host-disk-partition-spec';

export interface HostDiagnosticPartitionCreateSpec extends DynamicData {
  active?: boolean;
  diagnosticType: string;
  id: HostScsiDiskPartition;
  partition: HostDiskPartitionSpec;
  storageType: string;
}