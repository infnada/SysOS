import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {MissingObject} from './missing-object';
import {ObjectUpdate} from './object-update';

export interface PropertyFilterUpdate extends DynamicData {
  filter: ManagedObjectReference & { $type: 'PropertyFilter'; };
  missingSet?: MissingObject[];
  objectSet?: ObjectUpdate[];
}