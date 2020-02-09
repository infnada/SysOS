import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostSubSpecification} from '../data/host-sub-specification';


export interface UpdateHostSubSpecification {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  hostSubSpec: HostSubSpecification;
}