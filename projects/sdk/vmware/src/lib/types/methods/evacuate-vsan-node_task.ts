import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostMaintenanceSpec} from '../data/host-maintenance-spec';


export interface EvacuateVsanNode_Task {
  _this: ManagedObjectReference;
  maintenanceSpec: HostMaintenanceSpec;
  timeout: number;
}