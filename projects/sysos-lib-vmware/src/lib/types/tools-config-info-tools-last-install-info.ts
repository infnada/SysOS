import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {Int} from './int';
export interface ToolsConfigInfoToolsLastInstallInfo extends DynamicData {
  counter: Int;
  fault?: LocalizedMethodFault;
}
