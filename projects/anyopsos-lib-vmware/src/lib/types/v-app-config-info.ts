import {VmConfigInfo} from './vm-config-info';

import {VAppEntityConfigInfo} from './v-app-entity-config-info';
import {ManagedByInfo} from './managed-by-info';
export interface VAppConfigInfo extends VmConfigInfo {
  annotation: string;
  entityConfig?: VAppEntityConfigInfo[];
  instanceUuid?: string;
  managedBy?: ManagedByInfo;
}
