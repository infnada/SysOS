import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostSpecification} from '../data/host-specification';


export interface UpdateHostSpecification {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  hostSpec: HostSpecification;
}