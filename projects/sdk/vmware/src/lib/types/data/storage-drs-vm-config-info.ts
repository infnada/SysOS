import {DynamicData} from './dynamic-data';

import {VirtualDiskAntiAffinityRuleSpec} from './virtual-disk-anti-affinity-rule-spec';
import {VirtualDiskRuleSpec} from './virtual-disk-rule-spec';
import {ManagedObjectReference} from './managed-object-reference';

export interface StorageDrsVmConfigInfo extends DynamicData {
  behavior?: string;
  enabled?: boolean;
  intraVmAffinity?: boolean;
  intraVmAntiAffinity?: VirtualDiskAntiAffinityRuleSpec;
  virtualDiskRules?: VirtualDiskRuleSpec[];
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}