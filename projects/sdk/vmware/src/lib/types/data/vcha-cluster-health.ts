import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {VchaClusterRuntimeInfo} from './vcha-cluster-runtime-info';

export interface VchaClusterHealth extends DynamicData {
  additionalInformation?: LocalizableMessage[];
  healthMessages?: LocalizableMessage[];
  runtimeInfo: VchaClusterRuntimeInfo;
}