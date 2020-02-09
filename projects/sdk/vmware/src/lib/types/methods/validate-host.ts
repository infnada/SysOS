import {ManagedObjectReference} from '../data/managed-object-reference';
import {OvfValidateHostParams} from '../data/ovf-validate-host-params';


export interface ValidateHost {
  _this: ManagedObjectReference;
  ovfDescriptor: string;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  vhp: OvfValidateHostParams;
}