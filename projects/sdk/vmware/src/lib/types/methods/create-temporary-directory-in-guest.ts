import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';


export interface CreateTemporaryDirectoryInGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  prefix: string;
  suffix: string;
  directoryPath?: string;
}