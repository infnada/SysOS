import {DynamicData} from './dynamic-data';

export interface HostCpuPowerManagementInfo extends DynamicData {
  currentPolicy?: string;
  hardwareSupport?: string;
}
