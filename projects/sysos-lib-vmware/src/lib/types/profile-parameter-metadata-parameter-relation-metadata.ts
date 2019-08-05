import {DynamicData} from './dynamic-data';

import {ProfilePropertyPath} from './profile-property-path';
import {Int} from './int';
export interface ProfileParameterMetadataParameterRelationMetadata extends DynamicData {
  maxCount: Int;
  minCount: Int;
  path?: ProfilePropertyPath;
  relationTypes?: string[];
  values?: any[];
}
