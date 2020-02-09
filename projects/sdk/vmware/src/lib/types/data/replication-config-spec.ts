import {DynamicData} from './dynamic-data';

import {ReplicationInfoDiskSettings} from './replication-info-disk-settings';

export interface ReplicationConfigSpec extends DynamicData {
  destination: string;
  disk?: ReplicationInfoDiskSettings[];
  encryptionDestination?: string;
  encryptionPort?: number;
  generation: number;
  netCompressionEnabled?: boolean;
  netEncryptionEnabled?: boolean;
  oppUpdatesEnabled: boolean;
  paused: boolean;
  port: number;
  quiesceGuestEnabled: boolean;
  remoteCertificateThumbprint?: string;
  rpo: number;
  vmReplicationId: string;
}