import {ManagedObjectReference} from '../data/managed-object-reference';
import {CustomizationSpecItem} from '../data/customization-spec-item';


export interface CreateCustomizationSpec {
  _this: ManagedObjectReference;
  item: CustomizationSpecItem;
}