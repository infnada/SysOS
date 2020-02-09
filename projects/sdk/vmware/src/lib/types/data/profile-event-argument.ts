import {EventArgument} from './event-argument';

import {ManagedObjectReference} from './managed-object-reference';

export interface ProfileEventArgument extends EventArgument {
  name: string;
  profile: ManagedObjectReference & { $type: 'Profile'; };
}