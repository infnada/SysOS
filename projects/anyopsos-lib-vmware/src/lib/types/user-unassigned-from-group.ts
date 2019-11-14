import {HostEvent} from './host-event';

export interface UserUnassignedFromGroup extends HostEvent {
  group: string;
  userLogin: string;
}
