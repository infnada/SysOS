import {DynamicData} from './dynamic-data';

import {AlarmAction} from './alarm-action';
import {AlarmExpression} from './alarm-expression';
import {AlarmSetting} from './alarm-setting';
import {Int} from './int';
export interface AlarmSpec extends DynamicData {
  action?: AlarmAction;
  actionFrequency?: Int;
  description: string;
  enabled: boolean;
  expression: AlarmExpression;
  name: string;
  setting?: AlarmSetting;
  systemName?: string;
}
