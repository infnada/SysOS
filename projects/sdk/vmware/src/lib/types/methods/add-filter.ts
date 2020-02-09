import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AddFilter {
  _this: ManagedObjectReference;
  providerId: string;
  filterName: string;
  infoIds?: string[];
}