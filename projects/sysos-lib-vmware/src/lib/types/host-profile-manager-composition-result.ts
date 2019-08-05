import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {HostProfileManagerCompositionResultResultElement} from './host-profile-manager-composition-result-result-element';
export interface HostProfileManagerCompositionResult extends DynamicData {
  errors?: LocalizableMessage[];
  results?: HostProfileManagerCompositionResultResultElement[];
}
