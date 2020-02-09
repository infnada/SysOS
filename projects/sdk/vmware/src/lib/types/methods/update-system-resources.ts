import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostSystemResourceInfo} from '../data/host-system-resource-info';


export interface UpdateSystemResources {
  _this: ManagedObjectReference;
  resourceInfo: HostSystemResourceInfo;
}