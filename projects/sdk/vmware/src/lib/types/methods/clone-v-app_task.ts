import {ManagedObjectReference} from '../data/managed-object-reference';
import {VAppCloneSpec} from '../data/v-app-clone-spec';


export interface CloneVApp_Task {
  _this: ManagedObjectReference;
  name: string;
  target: ManagedObjectReference & { $type: 'ResourcePool'; };
  spec: VAppCloneSpec;
}