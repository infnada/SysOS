import {NegatableExpression} from './negatable-expression';
import {Int} from './int';

export interface IntExpression extends NegatableExpression {
  value?: Int;
}
