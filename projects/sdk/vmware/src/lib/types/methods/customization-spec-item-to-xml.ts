import {ManagedObjectReference} from '../data/managed-object-reference';
import {CustomizationSpecItem} from '../data/customization-spec-item';


export interface CustomizationSpecItemToXml {
  _this: ManagedObjectReference;
  item: CustomizationSpecItem;
}