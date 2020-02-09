import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';

export interface ClusterComputeResourceValidationResultBase extends DynamicData {
  info?: LocalizableMessage[];
}