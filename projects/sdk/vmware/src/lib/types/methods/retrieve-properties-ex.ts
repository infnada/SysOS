import {ManagedObjectReference} from '../data/managed-object-reference';
import {PropertyFilterSpec} from '../data/property-filter-spec';
import {RetrieveOptions} from '../data/retrieve-options';


export interface RetrievePropertiesEx {
  _this: ManagedObjectReference;
  specSet: PropertyFilterSpec[];
  options: RetrieveOptions;
}