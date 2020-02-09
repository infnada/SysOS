import {DynamicData} from './dynamic-data';

import {EVCMode} from './e-v-c-mode';

export interface Capability extends DynamicData {
  ftDrsWithoutEvcSupported?: boolean;
  hciWorkflowSupported?: boolean;
  multiHostSupported: boolean;
  networkBackupAndRestoreSupported?: boolean;
  provisioningSupported: boolean;
  supportedEVCMode?: EVCMode[];
  userShellAccessSupported: boolean;
}