import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface DistributedVirtualSwitchPortStatistics extends DynamicData {
  bytesInBroadcast: Long;
  bytesInFromPnic?: Long;
  bytesInMulticast: Long;
  bytesInUnicast: Long;
  bytesOutBroadcast: Long;
  bytesOutMulticast: Long;
  bytesOutToPnic?: Long;
  bytesOutUnicast: Long;
  packetsInBroadcast: Long;
  packetsInDropped: Long;
  packetsInException: Long;
  packetsInMulticast: Long;
  packetsInUnicast: Long;
  packetsOutBroadcast: Long;
  packetsOutDropped: Long;
  packetsOutException: Long;
  packetsOutMulticast: Long;
  packetsOutUnicast: Long;
}
