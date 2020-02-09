import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindAllByIp {
  _this: ManagedObjectReference;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  ip: string;
  vmSearch: boolean;
}