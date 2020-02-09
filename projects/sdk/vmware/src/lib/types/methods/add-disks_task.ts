import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostScsiDisk} from '../data/host-scsi-disk';


export interface AddDisks_Task {
  _this: ManagedObjectReference;
  disk: HostScsiDisk[];
}