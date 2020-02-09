import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';
import {GuestRegValueNameSpec} from '../data/guest-reg-value-name-spec';


export interface DeleteRegistryValueInGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  valueName: GuestRegValueNameSpec;
}