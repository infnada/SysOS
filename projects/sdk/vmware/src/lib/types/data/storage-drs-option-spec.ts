import {ArrayUpdateSpec} from './array-update-spec';

import {OptionValue} from './option-value';

export interface StorageDrsOptionSpec extends ArrayUpdateSpec {
  option?: OptionValue;
}