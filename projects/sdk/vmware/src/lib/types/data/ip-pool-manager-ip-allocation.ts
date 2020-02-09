import {DynamicData} from './dynamic-data';


export interface IpPoolManagerIpAllocation extends DynamicData {
  allocationId: string;
  ipAddress: string;
}