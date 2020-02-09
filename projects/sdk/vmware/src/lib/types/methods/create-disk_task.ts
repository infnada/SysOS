import {ManagedObjectReference} from '../data/managed-object-reference';
import {VslmCreateSpec} from '../data/vslm-create-spec';


export interface CreateDisk_Task {
  _this: ManagedObjectReference;
  spec: VslmCreateSpec;
}