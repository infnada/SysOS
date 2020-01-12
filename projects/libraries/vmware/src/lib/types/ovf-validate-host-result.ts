import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {Long} from './long';
export interface OvfValidateHostResult extends DynamicData {
  downloadSize?: Long;
  error?: LocalizedMethodFault[];
  flatDeploymentSize?: Long;
  sparseDeploymentSize?: Long;
  supportedDiskProvisioning?: string[];
  warning?: LocalizedMethodFault[];
}
