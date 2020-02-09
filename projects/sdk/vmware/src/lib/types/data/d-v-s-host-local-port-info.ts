import {DynamicData} from './dynamic-data';

import {DVPortSetting} from './d-v-port-setting';

export interface DVSHostLocalPortInfo extends DynamicData {
  portKey: string;
  setting: DVPortSetting;
  switchUuid: string;
  vnic: string;
}