import {DynamicData} from './dynamic-data';

import {VMwareVspanSession} from './v-mware-vspan-session';
export interface VMwareDVSVspanConfigSpec extends DynamicData {
  operation: string;
  vspanSession: VMwareVspanSession;
}
