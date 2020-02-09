import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostCacheConfigurationSpec} from '../data/host-cache-configuration-spec';


export interface ConfigureHostCache_Task {
  _this: ManagedObjectReference;
  spec: HostCacheConfigurationSpec;
}