import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface VirtualMachineWipeResult extends DynamicData {
  diskId: Int;
  shrinkableDiskSpace: Long;
}
