import {DynamicData} from './dynamic-data';

import {GuestFileAttributes} from './guest-file-attributes';
import {Long} from './long';
export interface GuestFileInfo extends DynamicData {
  attributes: GuestFileAttributes;
  path: string;
  size: Long;
  type: string;
}
