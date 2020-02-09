import {ManagedObjectReference} from '../data/managed-object-reference';
import {OvfCreateImportSpecParams} from '../data/ovf-create-import-spec-params';


export interface CreateImportSpec {
  _this: ManagedObjectReference;
  ovfDescriptor: string;
  resourcePool: ManagedObjectReference & { $type: 'ResourcePool'; };
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  cisp: OvfCreateImportSpecParams;
}