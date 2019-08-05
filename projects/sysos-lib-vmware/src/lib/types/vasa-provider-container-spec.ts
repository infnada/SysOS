import {DynamicData} from './dynamic-data';

import {VimVasaProviderInfo} from './vim-vasa-provider-info';
export interface VasaProviderContainerSpec extends DynamicData {
  deleted?: VimVasaProviderInfo[];
}
