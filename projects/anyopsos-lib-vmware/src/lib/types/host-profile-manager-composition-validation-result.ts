import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {HostProfileManagerCompositionValidationResultResultElement} from './host-profile-manager-composition-validation-result-result-element';
export interface HostProfileManagerCompositionValidationResult extends DynamicData {
  errors?: LocalizableMessage[];
  results?: HostProfileManagerCompositionValidationResultResultElement[];
}
