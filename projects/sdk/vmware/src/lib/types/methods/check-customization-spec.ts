import {ManagedObjectReference} from '../data/managed-object-reference';
import {CustomizationSpec} from '../data/customization-spec';


export interface CheckCustomizationSpec {
  _this: ManagedObjectReference;
  spec: CustomizationSpec;
}