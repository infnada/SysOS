import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {AutoStartWaitHeartbeatSetting} from './auto-start-wait-heartbeat-setting';
import {Int} from './int';
export interface AutoStartPowerInfo extends DynamicData {
  key: ManagedObjectReference & { $type: 'VirtualMachine' };
  startAction: string;
  startDelay: Int;
  startOrder: Int;
  stopAction: string;
  stopDelay: Int;
  waitForHeartbeat: AutoStartWaitHeartbeatSetting;
}
