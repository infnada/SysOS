import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostAutoStartManagerConfig} from '../data/host-auto-start-manager-config';


export interface ReconfigureAutostart {
  _this: ManagedObjectReference;
  spec: HostAutoStartManagerConfig;
}