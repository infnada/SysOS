import {ManagedObjectReference} from '../data/managed-object-reference';
import {NvdimmPMemNamespaceCreateSpec} from '../data/nvdimm-p-mem-namespace-create-spec';


export interface CreateNvdimmPMemNamespace_Task {
  _this: ManagedObjectReference;
  createSpec: NvdimmPMemNamespaceCreateSpec;
}