import {DynamicData} from './dynamic-data';

import {VMwareDvsLacpGroupConfig} from './v-mware-dvs-lacp-group-config';

export interface VMwareDvsLacpGroupSpec extends DynamicData {
  lacpGroupConfig: VMwareDvsLacpGroupConfig;
  operation: string;
}