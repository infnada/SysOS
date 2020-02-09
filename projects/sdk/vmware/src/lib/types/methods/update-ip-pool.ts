import {ManagedObjectReference} from '../data/managed-object-reference';
import {IpPool} from '../data/ip-pool';


export interface UpdateIpPool {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
  pool: IpPool;
}