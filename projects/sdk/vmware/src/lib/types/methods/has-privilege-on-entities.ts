import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HasPrivilegeOnEntities {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
  sessionId: string;
  privId?: string[];
}