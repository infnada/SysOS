import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';

export interface HostVsanInternalSystemVsanObjectOperationResult extends DynamicData {
  failureReason?: LocalizableMessage[];
  uuid: string;
}