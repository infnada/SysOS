import {HostEvent} from './host-event';

export interface UserPasswordChanged extends HostEvent {
  userLogin: string;
}
