import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface HbrManagerVmReplicationCapability extends DynamicData {
  compressionSupported: boolean;
  fault?: LocalizedMethodFault;
  maxSupportedSourceDiskCapacity: Long;
  minRpo?: Long;
  supportedQuiesceMode: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
