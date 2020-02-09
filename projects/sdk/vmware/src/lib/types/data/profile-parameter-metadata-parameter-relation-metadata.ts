import {DynamicData} from './dynamic-data';

import {ProfilePropertyPath} from './profile-property-path';

export interface ProfileParameterMetadataParameterRelationMetadata extends DynamicData {
  maxCount: number;
  minCount: number;
  path?: ProfilePropertyPath;
  relationTypes?: string[];
  values?: any[];
}