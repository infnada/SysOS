import {DynamicData} from './dynamic-data';

export interface ProfileExpression extends DynamicData {
  displayName: string;
  id: string;
  negated: boolean;
}
