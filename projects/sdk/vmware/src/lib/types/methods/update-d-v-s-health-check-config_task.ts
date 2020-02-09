import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVSHealthCheckConfig} from '../data/d-v-s-health-check-config';


export interface UpdateDVSHealthCheckConfig_Task {
  _this: ManagedObjectReference;
  healthCheckConfig: DVSHealthCheckConfig[];
}