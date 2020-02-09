import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindAllByUuid {
  _this: ManagedObjectReference;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  uuid: string;
  vmSearch: boolean;
  instanceUuid?: boolean;
}