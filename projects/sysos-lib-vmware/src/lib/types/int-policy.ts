import {InheritablePolicy} from './inheritable-policy';
import {Int} from './int';

export interface IntPolicy extends InheritablePolicy {
  value?: Int;
}
