import {ManagedObjectReference} from '../data/managed-object-reference';
import {ResourceConfigSpec} from '../data/resource-config-spec';
import {VAppConfigSpec} from '../data/v-app-config-spec';


export interface CreateVApp {
  _this: ManagedObjectReference;
  name: string;
  resSpec: ResourceConfigSpec;
  configSpec: VAppConfigSpec;
  vmFolder?: ManagedObjectReference & { $type: 'Folder'; };
}