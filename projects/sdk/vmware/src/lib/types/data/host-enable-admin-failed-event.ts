import {HostEvent} from './host-event';

import {Permission} from './permission';

export interface HostEnableAdminFailedEvent extends HostEvent {
  permissions: Permission[];
}