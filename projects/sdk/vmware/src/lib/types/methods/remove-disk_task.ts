import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostScsiDisk} from '../data/host-scsi-disk';
import {HostMaintenanceSpec} from '../data/host-maintenance-spec';


export interface RemoveDisk_Task {
  _this: ManagedObjectReference;
  disk: HostScsiDisk[];
  maintenanceSpec?: HostMaintenanceSpec;
  timeout?: number;
}