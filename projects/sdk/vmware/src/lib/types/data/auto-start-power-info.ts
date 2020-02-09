import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {AutoStartWaitHeartbeatSetting} from '../enums/auto-start-wait-heartbeat-setting';

export interface AutoStartPowerInfo extends DynamicData {
  key: ManagedObjectReference & { $type: 'VirtualMachine'; };
  startAction: string;
  startDelay: number;
  startOrder: number;
  stopAction: string;
  stopDelay: number;
  waitForHeartbeat: AutoStartWaitHeartbeatSetting;
}