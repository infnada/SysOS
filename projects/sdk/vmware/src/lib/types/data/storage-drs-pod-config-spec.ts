import {DynamicData} from './dynamic-data';

import {StorageDrsAutomationConfig} from './storage-drs-automation-config';
import {StorageDrsIoLoadBalanceConfig} from './storage-drs-io-load-balance-config';
import {StorageDrsOptionSpec} from './storage-drs-option-spec';
import {ClusterRuleSpec} from './cluster-rule-spec';
import {StorageDrsSpaceLoadBalanceConfig} from './storage-drs-space-load-balance-config';

export interface StorageDrsPodConfigSpec extends DynamicData {
  automationOverrides?: StorageDrsAutomationConfig;
  defaultIntraVmAffinity?: boolean;
  defaultVmBehavior?: string;
  enabled?: boolean;
  ioLoadBalanceConfig?: StorageDrsIoLoadBalanceConfig;
  ioLoadBalanceEnabled?: boolean;
  loadBalanceInterval?: number;
  option?: StorageDrsOptionSpec[];
  rule?: ClusterRuleSpec[];
  spaceLoadBalanceConfig?: StorageDrsSpaceLoadBalanceConfig;
}