import {DynamicData} from './dynamic-data';

import {ReplicationInfoDiskSettings} from './replication-info-disk-settings';
import {Int} from './int';
import {Long} from './long';
export interface ReplicationConfigSpec extends DynamicData {
  destination: string;
  disk?: ReplicationInfoDiskSettings[];
  encryptionDestination?: string;
  encryptionPort?: Int;
  generation: Long;
  netCompressionEnabled?: boolean;
  netEncryptionEnabled?: boolean;
  oppUpdatesEnabled: boolean;
  paused: boolean;
  port: Int;
  quiesceGuestEnabled: boolean;
  remoteCertificateThumbprint?: string;
  rpo: Long;
  vmReplicationId: string;
}
