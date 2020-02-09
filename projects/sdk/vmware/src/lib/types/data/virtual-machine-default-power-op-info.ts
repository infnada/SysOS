import {DynamicData} from './dynamic-data';


export interface VirtualMachineDefaultPowerOpInfo extends DynamicData {
  defaultPowerOffType?: string;
  defaultResetType?: string;
  defaultSuspendType?: string;
  powerOffType?: string;
  resetType?: string;
  standbyAction?: string;
  suspendType?: string;
}