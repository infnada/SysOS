import {AuthorizationEvent} from './authorization-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
export interface PermissionEvent extends AuthorizationEvent {
  entity: ManagedEntityEventArgument;
  group: boolean;
  principal: string;
}
