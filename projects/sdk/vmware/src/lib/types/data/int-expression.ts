import {NegatableExpression} from './negatable-expression';


export interface IntExpression extends NegatableExpression {
  value?: number;
}