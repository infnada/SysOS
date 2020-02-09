import {EntityEventArgument} from './entity-event-argument';

import {ManagedObjectReference} from './managed-object-reference';

export interface FolderEventArgument extends EntityEventArgument {
  folder: ManagedObjectReference & { $type: 'Folder'; };
}