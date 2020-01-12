import {InheritablePolicy} from './inheritable-policy';
import {Long} from './long';

export interface LongPolicy extends InheritablePolicy {
  value?: Long;
}
