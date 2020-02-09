import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';


export interface MakeDirectoryInGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  directoryPath: string;
  createParentDirectories: boolean;
}