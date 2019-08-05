import {ArrayUpdateSpec} from './array-update-spec';

import {ClusterRuleInfo} from './cluster-rule-info';
export interface ClusterRuleSpec extends ArrayUpdateSpec {
  info?: ClusterRuleInfo;
}
