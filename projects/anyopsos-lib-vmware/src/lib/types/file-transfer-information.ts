import {DynamicData} from './dynamic-data';

import {GuestFileAttributes} from './guest-file-attributes';
import {Long} from './long';
export interface FileTransferInformation extends DynamicData {
  attributes: GuestFileAttributes;
  size: Long;
  url: string;
}
