import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVFlashManagerVFlashCacheConfigSpec} from '../data/host-v-flash-manager-v-flash-cache-config-spec';


export interface HostConfigVFlashCache {
  _this: ManagedObjectReference;
  spec: HostVFlashManagerVFlashCacheConfigSpec;
}