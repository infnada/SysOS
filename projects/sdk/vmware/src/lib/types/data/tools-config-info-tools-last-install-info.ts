import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface ToolsConfigInfoToolsLastInstallInfo extends DynamicData {
  counter: number;
  fault?: LocalizedMethodFault;
}