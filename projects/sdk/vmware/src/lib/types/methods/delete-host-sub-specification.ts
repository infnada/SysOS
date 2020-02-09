import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteHostSubSpecification {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  subSpecName: string;
}