import {ManagedObjectReference} from '../data/managed-object-reference';
import {VsanHostConfigInfo} from '../data/vsan-host-config-info';


export interface UpdateVsan_Task {
  _this: ManagedObjectReference;
  config: VsanHostConfigInfo;
}