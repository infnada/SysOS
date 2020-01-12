import {HostEvent} from './host-event';

export interface AccountRemovedEvent extends HostEvent {
  account: string;
  group: boolean;
}
