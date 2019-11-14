import {ClusterEvent} from './cluster-event';

import {ProfileEventArgument} from './profile-event-argument';
export interface ClusterComplianceCheckedEvent extends ClusterEvent {
  profile: ProfileEventArgument;
}
