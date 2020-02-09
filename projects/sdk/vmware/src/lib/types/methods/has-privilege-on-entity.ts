import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HasPrivilegeOnEntity {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  sessionId: string;
  privId?: string[];
}