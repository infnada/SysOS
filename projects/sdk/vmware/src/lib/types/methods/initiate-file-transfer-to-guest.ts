import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';
import {GuestFileAttributes} from '../data/guest-file-attributes';


export interface InitiateFileTransferToGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  guestFilePath: string;
  fileAttributes: GuestFileAttributes;
  fileSize: number;
  overwrite: boolean;
}