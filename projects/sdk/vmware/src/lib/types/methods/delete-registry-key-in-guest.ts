import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';
import {GuestRegKeyNameSpec} from '../data/guest-reg-key-name-spec';


export interface DeleteRegistryKeyInGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  keyName: GuestRegKeyNameSpec;
  recursive: boolean;
}