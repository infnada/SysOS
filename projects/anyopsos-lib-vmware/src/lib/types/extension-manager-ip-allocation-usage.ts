import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ExtensionManagerIpAllocationUsage extends DynamicData {
  extensionKey: string;
  numAddresses: Int;
}
