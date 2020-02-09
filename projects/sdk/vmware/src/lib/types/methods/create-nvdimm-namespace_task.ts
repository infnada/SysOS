import {ManagedObjectReference} from '../data/managed-object-reference';
import {NvdimmNamespaceCreateSpec} from '../data/nvdimm-namespace-create-spec';


export interface CreateNvdimmNamespace_Task {
  _this: ManagedObjectReference;
  createSpec: NvdimmNamespaceCreateSpec;
}