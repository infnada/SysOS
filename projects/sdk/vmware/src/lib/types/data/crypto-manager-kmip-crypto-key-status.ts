import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {CryptoKeyId} from './crypto-key-id';

export interface CryptoManagerKmipCryptoKeyStatus extends DynamicData {
  affectedHosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  encryptedVMs?: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
  keyAvailable?: boolean;
  keyId: CryptoKeyId;
  reason?: string;
  referencedByTags?: string[];
}