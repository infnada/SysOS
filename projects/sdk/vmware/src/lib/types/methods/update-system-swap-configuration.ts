import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostSystemSwapConfiguration} from '../data/host-system-swap-configuration';


export interface UpdateSystemSwapConfiguration {
  _this: ManagedObjectReference;
  sysSwapConfig: HostSystemSwapConfiguration;
}