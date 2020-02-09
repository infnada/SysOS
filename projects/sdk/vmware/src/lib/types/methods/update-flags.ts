import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostFlagInfo} from '../data/host-flag-info';


export interface UpdateFlags {
  _this: ManagedObjectReference;
  flagInfo: HostFlagInfo;
}