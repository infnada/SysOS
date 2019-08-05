import {DynamicData} from './dynamic-data';

export interface VirtualMachineForkConfigInfo extends DynamicData {
  childForkGroupId?: string;
  childType?: string;
  parentEnabled?: boolean;
  parentForkGroupId?: string;
}
