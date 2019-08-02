import {ManagedObjectReference} from "./managed-object-reference";

export interface Permission {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity' };
  group: boolean;
  principal: string;
  propagate: boolean;
  roleId: number;
}
