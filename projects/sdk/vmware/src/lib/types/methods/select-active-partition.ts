import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostScsiDiskPartition} from '../data/host-scsi-disk-partition';


export interface SelectActivePartition {
  _this: ManagedObjectReference;
  partition?: HostScsiDiskPartition;
}