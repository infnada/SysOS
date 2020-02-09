import {DynamicData} from './dynamic-data';

import {VimVasaProviderStatePerArray} from './vim-vasa-provider-state-per-array';
import {VimVasaProvider} from './vim-vasa-provider';

export interface VimVasaProviderInfo extends DynamicData {
  arrayState?: VimVasaProviderStatePerArray[];
  provider: VimVasaProvider;
}