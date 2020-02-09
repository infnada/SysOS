import {VmfsDatastoreSpec} from './vmfs-datastore-spec';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {HostDiskPartitionSpec} from './host-disk-partition-spec';
import {HostVmfsSpec} from './host-vmfs-spec';

export interface VmfsDatastoreCreateSpec extends VmfsDatastoreSpec {
  extent?: HostScsiDiskPartition[];
  partition: HostDiskPartitionSpec;
  vmfs: HostVmfsSpec;
}