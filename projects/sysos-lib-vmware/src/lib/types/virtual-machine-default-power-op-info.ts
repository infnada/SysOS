import {DynamicData} from './dynamic-data';

export interface VirtualMachineDefaultPowerOpInfo extends DynamicData {
  defaultPowerOffType?: string;
  resetType?: string;
  standbyAction?: string;
  suspendType?: string;
}
