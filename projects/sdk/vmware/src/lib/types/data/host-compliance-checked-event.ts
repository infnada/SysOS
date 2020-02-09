import {HostEvent} from './host-event';

import {ProfileEventArgument} from './profile-event-argument';

export interface HostComplianceCheckedEvent extends HostEvent {
  profile: ProfileEventArgument;
}