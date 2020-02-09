import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVsanInternalSystemCmmdsQuery} from '../data/host-vsan-internal-system-cmmds-query';


export interface QueryCmmds {
  _this: ManagedObjectReference;
  queries: HostVsanInternalSystemCmmdsQuery[];
}