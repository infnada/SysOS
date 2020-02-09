import {RoleEvent} from './role-event';


export interface RoleAddedEvent extends RoleEvent {
  privilegeList?: string[];
}