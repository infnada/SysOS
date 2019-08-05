import {PermissionEvent} from './permission-event';

import {RoleEventArgument} from './role-event-argument';
export interface PermissionUpdatedEvent extends PermissionEvent {
  prevPropagate?: boolean;
  prevRole?: RoleEventArgument;
  propagate: boolean;
  role: RoleEventArgument;
}
