import {ImportSpec} from './import-spec';

import {ResourceConfigSpec} from './resource-config-spec';
import {VAppConfigSpec} from './v-app-config-spec';

export interface VirtualAppImportSpec extends ImportSpec {
  child?: ImportSpec[];
  name: string;
  resourcePoolSpec: ResourceConfigSpec;
  vAppConfigSpec: VAppConfigSpec;
}