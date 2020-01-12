import {AuthorizationEvent} from './authorization-event';

import {RoleEventArgument} from './role-event-argument';
export interface RoleEvent extends AuthorizationEvent {
  role: RoleEventArgument;
}
