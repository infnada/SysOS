import {ManagedObjectReference} from '../data/managed-object-reference';
import {VslmCreateSpec} from '../data/vslm-create-spec';


export interface HostCreateDisk_Task {
  _this: ManagedObjectReference;
  spec: VslmCreateSpec;
}