import {DynamicData} from './dynamic-data';

import {ExtendedElementDescription} from './extended-element-description';
import {ProfileParameterMetadata} from './profile-parameter-metadata';
export interface ProfileExpressionMetadata extends DynamicData {
  expressionId: ExtendedElementDescription;
  parameter?: ProfileParameterMetadata[];
}
