import {ManagedObjectReference} from '../data/managed-object-reference';
import {IpPool} from '../data/ip-pool';


export interface CreateIpPool {
  _this: ManagedObjectReference;
  dc: ManagedObjectReference & { $type: 'Datacenter'; };
  pool: IpPool;
}