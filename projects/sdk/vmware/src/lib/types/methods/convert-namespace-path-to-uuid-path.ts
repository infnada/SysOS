import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ConvertNamespacePathToUuidPath {
  _this: ManagedObjectReference;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  namespaceUrl: string;
}