import {DynamicData} from './dynamic-data';

import {ProfileExpression} from './profile-expression';
export interface ComplianceProfile extends DynamicData {
  expression: ProfileExpression[];
  rootExpression: string;
}
