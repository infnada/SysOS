import {LocalizedMethodFault} from './localized-method-fault';

export interface ScheduledHardwareUpgradeInfo {
  fault?: LocalizedMethodFault;
  scheduledHardwareUpgradeStatus?: string;
  upgradePolicy?: string;
  versionKey?: string;
}
