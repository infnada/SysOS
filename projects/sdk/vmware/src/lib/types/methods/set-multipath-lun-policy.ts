import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostMultipathInfoLogicalUnitPolicy} from '../data/host-multipath-info-logical-unit-policy';


export interface SetMultipathLunPolicy {
  _this: ManagedObjectReference;
  lunId: string;
  policy: HostMultipathInfoLogicalUnitPolicy;
}