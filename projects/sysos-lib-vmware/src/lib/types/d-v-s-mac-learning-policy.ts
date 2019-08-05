import {InheritablePolicy} from './inheritable-policy';
import {Int} from './int';

export interface DVSMacLearningPolicy extends InheritablePolicy {
  allowUnicastFlooding?: boolean;
  enabled: boolean;
  limit?: Int;
  limitPolicy?: string;
}
