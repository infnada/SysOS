import {ProfileExpression} from './profile-expression';

import {KeyAnyValue} from './key-any-value';

export interface ProfileSimpleExpression extends ProfileExpression {
  expressionType: string;
  parameter?: KeyAnyValue[];
}