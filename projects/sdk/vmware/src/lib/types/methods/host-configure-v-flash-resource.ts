import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVFlashManagerVFlashResourceConfigSpec} from '../data/host-v-flash-manager-v-flash-resource-config-spec';


export interface HostConfigureVFlashResource {
  _this: ManagedObjectReference;
  spec: HostVFlashManagerVFlashResourceConfigSpec;
}