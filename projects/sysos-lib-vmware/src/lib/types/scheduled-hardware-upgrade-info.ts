import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface ScheduledHardwareUpgradeInfo extends DynamicData {
  fault?: LocalizedMethodFault;
  scheduledHardwareUpgradeStatus?: string;
  upgradePolicy?: string;
  versionKey?: string;
}
