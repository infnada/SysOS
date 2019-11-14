import {VmfsDatastoreSpec} from './vmfs-datastore-spec';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {HostDiskPartitionSpec} from './host-disk-partition-spec';
export interface VmfsDatastoreExpandSpec extends VmfsDatastoreSpec {
  extent: HostScsiDiskPartition;
  partition: HostDiskPartitionSpec;
}
