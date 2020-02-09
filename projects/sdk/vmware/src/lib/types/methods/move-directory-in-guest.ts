import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';


export interface MoveDirectoryInGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  srcDirectoryPath: string;
  dstDirectoryPath: string;
}