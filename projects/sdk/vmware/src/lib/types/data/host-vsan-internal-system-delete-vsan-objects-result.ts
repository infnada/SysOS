import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';

export interface HostVsanInternalSystemDeleteVsanObjectsResult extends DynamicData {
  failureReason?: LocalizableMessage[];
  success: boolean;
  uuid: string;
}