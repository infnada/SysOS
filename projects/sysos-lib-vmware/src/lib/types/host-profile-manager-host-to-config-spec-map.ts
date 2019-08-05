import {DynamicData} from './dynamic-data';

import {AnswerFileCreateSpec} from './answer-file-create-spec';
import {ManagedObjectReference} from './managed-object-reference';
export interface HostProfileManagerHostToConfigSpecMap extends DynamicData {
  configSpec: AnswerFileCreateSpec;
  host: ManagedObjectReference & { $type: 'HostSystem' };
}
