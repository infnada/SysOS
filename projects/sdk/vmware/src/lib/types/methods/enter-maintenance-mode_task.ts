import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostMaintenanceSpec} from '../data/host-maintenance-spec';


export interface EnterMaintenanceMode_Task {
  _this: ManagedObjectReference;
  timeout: number;
  evacuatePoweredOffVms?: boolean;
  maintenanceSpec?: HostMaintenanceSpec;
}