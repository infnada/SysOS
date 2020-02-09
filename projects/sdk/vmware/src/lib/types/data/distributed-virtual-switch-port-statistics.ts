import {DynamicData} from './dynamic-data';


export interface DistributedVirtualSwitchPortStatistics extends DynamicData {
  bytesInBroadcast: number;
  bytesInFromPnic?: number;
  bytesInMulticast: number;
  bytesInUnicast: number;
  bytesOutBroadcast: number;
  bytesOutMulticast: number;
  bytesOutToPnic?: number;
  bytesOutUnicast: number;
  packetsInBroadcast: number;
  packetsInDropped: number;
  packetsInException: number;
  packetsInMulticast: number;
  packetsInUnicast: number;
  packetsOutBroadcast: number;
  packetsOutDropped: number;
  packetsOutException: number;
  packetsOutMulticast: number;
  packetsOutUnicast: number;
}