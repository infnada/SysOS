import {ManagedObjectReference} from '../data/managed-object-reference';
import {OvfCreateDescriptorParams} from '../data/ovf-create-descriptor-params';


export interface CreateDescriptor {
  _this: ManagedObjectReference;
  obj: ManagedObjectReference & { $type: 'ManagedEntity'; };
  cdp: OvfCreateDescriptorParams;
}