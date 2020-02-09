import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';
import {VirtualMachineProfileSpec} from '../data/virtual-machine-profile-spec';
import {CryptoSpec} from '../data/crypto-spec';


export interface HostVStorageObjectCreateDiskFromSnapshot_Task {
  _this: ManagedObjectReference;
  id: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  snapshotId: ID;
  name: string;
  profile?: VirtualMachineProfileSpec[];
  crypto?: CryptoSpec;
  path?: string;
}