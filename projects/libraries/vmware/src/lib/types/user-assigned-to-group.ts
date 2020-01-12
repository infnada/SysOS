import {HostEvent} from './host-event';

export interface UserAssignedToGroup extends HostEvent {
  group: string;
  userLogin: string;
}
