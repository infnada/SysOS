import {DynamicData} from './dynamic-data';
import {Byte} from './byte';

export interface ScsiLunDurableName extends DynamicData {
  data?: Byte[];
  namespace: string;
  namespaceId: Byte;
}
