import {VmConfigSpec} from './vm-config-spec';

import {VAppEntityConfigInfo} from './v-app-entity-config-info';
import {ManagedByInfo} from './managed-by-info';
export interface VAppConfigSpec extends VmConfigSpec {
  annotation?: string;
  entityConfig?: VAppEntityConfigInfo[];
  instanceUuid?: string;
  managedBy?: ManagedByInfo;
}
