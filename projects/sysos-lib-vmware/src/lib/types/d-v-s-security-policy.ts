import {InheritablePolicy} from './inheritable-policy';

import {BoolPolicy} from './bool-policy';
export interface DVSSecurityPolicy extends InheritablePolicy {
  allowPromiscuous?: BoolPolicy;
  forgedTransmits?: BoolPolicy;
  macChanges?: BoolPolicy;
}
