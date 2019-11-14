import {HostProfilesEntityCustomizations} from './host-profiles-entity-customizations';

import {AnswerFile} from './answer-file';
import {ManagedObjectReference} from './managed-object-reference';
export interface StructuredCustomizations extends HostProfilesEntityCustomizations {
  customizations?: AnswerFile;
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
}
