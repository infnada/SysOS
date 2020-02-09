import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostGraphicsConfig} from '../data/host-graphics-config';


export interface UpdateGraphicsConfig {
  _this: ManagedObjectReference;
  config: HostGraphicsConfig;
}