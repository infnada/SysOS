import {ManagedObjectReference} from '../data/managed-object-reference';
import {PropertyFilterSpec} from '../data/property-filter-spec';


export interface RetrieveProperties {
  _this: ManagedObjectReference;
  specSet: PropertyFilterSpec[];
}