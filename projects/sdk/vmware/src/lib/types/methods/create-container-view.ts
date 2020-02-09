import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateContainerView {
  _this: ManagedObjectReference;
  container: ManagedObjectReference & { $type: 'ManagedEntity'; };
  type?: string[];
  recursive: boolean;
}