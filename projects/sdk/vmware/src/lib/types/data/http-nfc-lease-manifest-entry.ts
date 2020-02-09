import {DynamicData} from './dynamic-data';


export interface HttpNfcLeaseManifestEntry extends DynamicData {
  capacity?: number;
  checksum?: string;
  checksumType?: string;
  disk: boolean;
  key: string;
  populatedSize?: number;
  sha1: string;
  size: number;
}