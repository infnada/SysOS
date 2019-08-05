import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface VirtualMachineFileLayoutExFileInfo extends DynamicData {
  accessible?: boolean;
  backingObjectId?: string;
  key: Int;
  name: string;
  size: Long;
  type: string;
  uniqueSize?: Long;
}
