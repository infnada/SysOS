import {DynamicData} from './dynamic-data';


export interface ExtensionManagerIpAllocationUsage extends DynamicData {
  extensionKey: string;
  numAddresses: number;
}