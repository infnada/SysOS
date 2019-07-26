import {ReplicationInfoDiskSettings} from "./replication-info-disk-settings";

export interface ReplicationConfigSpec {
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
