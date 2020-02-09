import {DynamicData} from './dynamic-data';

import {ProfilePropertyPath} from './profile-property-path';

export interface ComplianceLocator extends DynamicData {
  applyPath: ProfilePropertyPath;
  expressionName: string;
}