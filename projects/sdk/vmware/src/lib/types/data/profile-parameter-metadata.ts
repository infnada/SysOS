import {DynamicData} from './dynamic-data';

import {ExtendedElementDescription} from './extended-element-description';
import {ProfileParameterMetadataParameterRelationMetadata} from './profile-parameter-metadata-parameter-relation-metadata';

export interface ProfileParameterMetadata extends DynamicData {
  defaultValue?: any;
  hidden?: boolean;
  id: ExtendedElementDescription;
  optional: boolean;
  parameterRelations?: ProfileParameterMetadataParameterRelationMetadata[];
  readOnly?: boolean;
  securitySensitive?: boolean;
  type: string;
}