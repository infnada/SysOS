import {DynamicData} from './dynamic-data';


export interface VirtualMachineConsolePreferences extends DynamicData {
  closeOnPowerOffOrSuspend?: boolean;
  enterFullScreenOnPowerOn?: boolean;
  powerOnWhenOpened?: boolean;
}