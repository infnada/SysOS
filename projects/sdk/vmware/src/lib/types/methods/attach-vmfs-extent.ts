import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostScsiDiskPartition} from '../data/host-scsi-disk-partition';


export interface AttachVmfsExtent {
  _this: ManagedObjectReference;
  vmfsPath: string;
  extent: HostScsiDiskPartition;
}