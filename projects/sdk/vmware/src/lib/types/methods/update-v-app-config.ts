import {ManagedObjectReference} from '../data/managed-object-reference';
import {VAppConfigSpec} from '../data/v-app-config-spec';


export interface UpdateVAppConfig {
  _this: ManagedObjectReference;
  spec: VAppConfigSpec;
}