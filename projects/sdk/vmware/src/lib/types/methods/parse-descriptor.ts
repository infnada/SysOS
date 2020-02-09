import {ManagedObjectReference} from '../data/managed-object-reference';
import {OvfParseDescriptorParams} from '../data/ovf-parse-descriptor-params';


export interface ParseDescriptor {
  _this: ManagedObjectReference;
  ovfDescriptor: string;
  pdp: OvfParseDescriptorParams;
}