import {ManagedObjectReference} from '../data/managed-object-reference';
import {NvdimmNamespaceDeleteSpec} from '../data/nvdimm-namespace-delete-spec';


export interface DeleteNvdimmNamespace_Task {
  _this: ManagedObjectReference;
  deleteSpec: NvdimmNamespaceDeleteSpec;
}