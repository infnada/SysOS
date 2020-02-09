import {InheritablePolicy} from './inheritable-policy';

import {LongPolicy} from './long-policy';
import {BoolPolicy} from './bool-policy';

export interface DVSTrafficShapingPolicy extends InheritablePolicy {
  averageBandwidth?: LongPolicy;
  burstSize?: LongPolicy;
  enabled?: BoolPolicy;
  peakBandwidth?: LongPolicy;
}