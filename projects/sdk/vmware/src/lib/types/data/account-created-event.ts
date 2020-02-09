import {HostEvent} from './host-event';

import {HostAccountSpec} from './host-account-spec';

export interface AccountCreatedEvent extends HostEvent {
  group: boolean;
  spec: HostAccountSpec;
}