import {DynamicData} from './dynamic-data';

import {GuestFileInfo} from './guest-file-info';
import {Int} from './int';
export interface GuestListFileInfo extends DynamicData {
  files?: GuestFileInfo[];
  remaining: Int;
}
