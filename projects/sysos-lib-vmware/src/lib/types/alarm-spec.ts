import {AlarmAction} from "./alarm-action";
import {AlarmExpression} from "./alarm-expression";
import {AlarmSetting} from "./alarm-setting";

export interface AlarmSpec {
  action?: AlarmAction;
  actionFrequency?: number;
  description: string;
  enabled: boolean;
  expression: AlarmExpression;
  name: string;
  setting?: AlarmSetting;
  systemName: string;
}
