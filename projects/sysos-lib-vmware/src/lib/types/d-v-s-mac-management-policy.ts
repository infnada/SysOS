import {InheritablePolicy} from './inheritable-policy';

import {DVSMacLearningPolicy} from './d-v-s-mac-learning-policy';
export interface DVSMacManagementPolicy extends InheritablePolicy {
  allowPromiscuous?: boolean;
  forgedTransmits?: boolean;
  macChanges?: boolean;
  macLearningPolicy?: DVSMacLearningPolicy;
}
