import {ProfileEvent} from './profile-event';

import {ManagedObjectReference} from './managed-object-reference';
export interface ProfileReferenceHostChangedEvent extends ProfileEvent {
  prevReferenceHostName?: string;
  referenceHost?: ManagedObjectReference & { $type: 'HostSystem' };
  referenceHostName?: string;
}
