import {HostEvent} from './host-event';

import {HostAccountSpec} from './host-account-spec';
export interface AccountUpdatedEvent extends HostEvent {
  group?: string;
  spec: HostAccountSpec;
}
