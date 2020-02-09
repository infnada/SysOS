import {NegatableExpression} from './negatable-expression';


export interface StringExpression extends NegatableExpression {
  value?: string;
}