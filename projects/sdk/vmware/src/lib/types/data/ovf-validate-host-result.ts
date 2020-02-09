import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface OvfValidateHostResult extends DynamicData {
  downloadSize?: number;
  error?: LocalizedMethodFault[];
  flatDeploymentSize?: number;
  sparseDeploymentSize?: number;
  supportedDiskProvisioning?: string[];
  warning?: LocalizedMethodFault[];
}