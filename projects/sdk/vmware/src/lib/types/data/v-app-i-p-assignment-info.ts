import {DynamicData} from './dynamic-data';


export interface VAppIPAssignmentInfo extends DynamicData {
  ipAllocationPolicy?: string;
  ipProtocol?: string;
  supportedAllocationScheme?: string[];
  supportedIpProtocol?: string[];
}