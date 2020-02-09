import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface HbrManagerVmReplicationCapability extends DynamicData {
  compressionSupported: boolean;
  fault?: LocalizedMethodFault;
  maxSupportedSourceDiskCapacity: number;
  minRpo?: number;
  supportedQuiesceMode: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}