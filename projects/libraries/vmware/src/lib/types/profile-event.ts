import {Event} from './event';

import {ProfileEventArgument} from './profile-event-argument';
export interface ProfileEvent extends Event {
  profile: ProfileEventArgument;
}
