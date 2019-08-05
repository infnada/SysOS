import {DynamicData} from './dynamic-data';

export interface StorageDrsAutomationConfig extends DynamicData {
  ioLoadBalanceAutomationMode?: string;
  policyEnforcementAutomationMode?: string;
  ruleEnforcementAutomationMode?: string;
  spaceLoadBalanceAutomationMode?: string;
  vmEvacuationAutomationMode?: string;
}
