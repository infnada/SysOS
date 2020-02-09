import {InheritablePolicy} from './inheritable-policy';


export interface DVSMacLearningPolicy extends InheritablePolicy {
  allowUnicastFlooding?: boolean;
  enabled: boolean;
  limit?: number;
  limitPolicy?: string;
}