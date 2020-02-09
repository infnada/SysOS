import {ManagedObjectReference} from '../data/managed-object-reference';
import {CustomizationSpecItem} from '../data/customization-spec-item';


export interface OverwriteCustomizationSpec {
  _this: ManagedObjectReference;
  item: CustomizationSpecItem;
}