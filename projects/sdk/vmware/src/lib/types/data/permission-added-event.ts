import {PermissionEvent} from './permission-event';

import {RoleEventArgument} from './role-event-argument';

export interface PermissionAddedEvent extends PermissionEvent {
  propagate: boolean;
  role: RoleEventArgument;
}