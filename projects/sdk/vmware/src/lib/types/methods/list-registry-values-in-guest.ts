import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';
import {GuestRegKeyNameSpec} from '../data/guest-reg-key-name-spec';


export interface ListRegistryValuesInGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  keyName: GuestRegKeyNameSpec;
  expandStrings: boolean;
  matchPattern?: string;
}