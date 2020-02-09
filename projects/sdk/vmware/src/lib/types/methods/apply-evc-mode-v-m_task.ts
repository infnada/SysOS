import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostFeatureMask} from '../data/host-feature-mask';


export interface ApplyEvcModeVM_Task {
  _this: ManagedObjectReference;
  mask?: HostFeatureMask[];
  completeMasks?: boolean;
}