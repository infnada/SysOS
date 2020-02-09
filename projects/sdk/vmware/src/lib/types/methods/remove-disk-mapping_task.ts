import {ManagedObjectReference} from '../data/managed-object-reference';
import {VsanHostDiskMapping} from '../data/vsan-host-disk-mapping';
import {HostMaintenanceSpec} from '../data/host-maintenance-spec';


export interface RemoveDiskMapping_Task {
  _this: ManagedObjectReference;
  mapping: VsanHostDiskMapping[];
  maintenanceSpec?: HostMaintenanceSpec;
  timeout?: number;
}