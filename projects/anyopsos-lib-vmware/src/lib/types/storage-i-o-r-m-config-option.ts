import {DynamicData} from './dynamic-data';

import {IntOption} from './int-option';
import {BoolOption} from './bool-option';
export interface StorageIORMConfigOption extends DynamicData {
  congestionThresholdOption: IntOption;
  enabledOption: BoolOption;
  reservationEnabledOption: BoolOption;
  statsCollectionEnabledOption: BoolOption;
}
