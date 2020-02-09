import {ManagedObjectReference} from '../data/managed-object-reference';
import {PropertyFilterSpec} from '../data/property-filter-spec';


export interface CreateFilter {
  _this: ManagedObjectReference;
  spec: PropertyFilterSpec;
  partialUpdates: boolean;
}