import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FetchUserPrivilegeOnEntities {
  _this: ManagedObjectReference;
  entities: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
  userName: string;
}