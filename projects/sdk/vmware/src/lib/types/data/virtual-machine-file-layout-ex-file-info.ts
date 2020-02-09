import {DynamicData} from './dynamic-data';


export interface VirtualMachineFileLayoutExFileInfo extends DynamicData {
  accessible?: boolean;
  backingObjectId?: string;
  key: number;
  name: string;
  size: number;
  type: string;
  uniqueSize?: number;
}