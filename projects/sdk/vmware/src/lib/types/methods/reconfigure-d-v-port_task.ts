import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVPortConfigSpec} from '../data/d-v-port-config-spec';


export interface ReconfigureDVPort_Task {
  _this: ManagedObjectReference;
  port: DVPortConfigSpec[];
}