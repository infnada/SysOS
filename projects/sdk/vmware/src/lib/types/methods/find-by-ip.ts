import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindByIp {
  _this: ManagedObjectReference;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  ip: string;
  vmSearch: boolean;
}