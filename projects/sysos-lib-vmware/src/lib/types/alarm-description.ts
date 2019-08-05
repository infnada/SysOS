import {DynamicData} from './dynamic-data';

import {TypeDescription} from './type-description';
import {ElementDescription} from './element-description';
export interface AlarmDescription extends DynamicData {
  action: TypeDescription[];
  datastoreConnectionState: ElementDescription[];
  entityStatus: ElementDescription[];
  expr: TypeDescription[];
  hostSystemConnectionState: ElementDescription[];
  hostSystemPowerState: ElementDescription[];
  metricOperator: ElementDescription[];
  stateOperator: ElementDescription[];
  virtualMachineGuestHeartbeatStatus: ElementDescription[];
  virtualMachinePowerState: ElementDescription[];
}
