import {DynamicData} from './dynamic-data';

import {StorageDrsAutomationConfig} from './storage-drs-automation-config';
import {StorageDrsIoLoadBalanceConfig} from './storage-drs-io-load-balance-config';
import {OptionValue} from './option-value';
import {ClusterRuleInfo} from './cluster-rule-info';
import {StorageDrsSpaceLoadBalanceConfig} from './storage-drs-space-load-balance-config';

export interface StorageDrsPodConfigInfo extends DynamicData {
  automationOverrides?: StorageDrsAutomationConfig;
  defaultIntraVmAffinity?: boolean;
  defaultVmBehavior: string;
  enabled: boolean;
  ioLoadBalanceConfig?: StorageDrsIoLoadBalanceConfig;
  ioLoadBalanceEnabled: boolean;
  loadBalanceInterval?: number;
  option?: OptionValue[];
  rule?: ClusterRuleInfo[];
  spaceLoadBalanceConfig?: StorageDrsSpaceLoadBalanceConfig;
}