import {ManagedObjectReference} from '../data/managed-object-reference';
import {CustomizationSpec} from '../data/customization-spec';


export interface CustomizeVM_Task {
  _this: ManagedObjectReference;
  spec: CustomizationSpec;
}