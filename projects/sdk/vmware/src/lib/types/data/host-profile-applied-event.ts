import {HostEvent} from './host-event';

import {ProfileEventArgument} from './profile-event-argument';

export interface HostProfileAppliedEvent extends HostEvent {
  profile: ProfileEventArgument;
}