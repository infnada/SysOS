import {ProfileExpression} from './profile-expression';


export interface ProfileCompositeExpression extends ProfileExpression {
  expressionName: string[];
  operator: string;
}