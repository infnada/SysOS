import {ManagedObjectReference} from '../data/managed-object-reference';
import {PhysicalNicLinkInfo} from '../data/physical-nic-link-info';


export interface UpdatePhysicalNicLinkSpeed {
  _this: ManagedObjectReference;
  device: string;
  linkSpeed?: PhysicalNicLinkInfo;
}