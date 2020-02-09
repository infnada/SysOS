import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualAppLinkInfo} from '../data/virtual-app-link-info';


export interface UpdateLinkedChildren {
  _this: ManagedObjectReference;
  addChangeSet?: VirtualAppLinkInfo[];
  removeSet?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}