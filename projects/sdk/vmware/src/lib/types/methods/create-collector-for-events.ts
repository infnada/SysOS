import {ManagedObjectReference} from '../data/managed-object-reference';
import {EventFilterSpec} from '../data/event-filter-spec';


export interface CreateCollectorForEvents {
  _this: ManagedObjectReference;
  filter: EventFilterSpec;
}