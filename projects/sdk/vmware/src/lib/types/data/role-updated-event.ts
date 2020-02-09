import {RoleEvent} from './role-event';


export interface RoleUpdatedEvent extends RoleEvent {
  prevRoleName?: string;
  privilegeList?: string[];
  privilegesAdded?: string[];
  privilegesRemoved?: string[];
}