import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';
import {GuestAuthAliasInfo} from '../data/guest-auth-alias-info';


export interface AddGuestAlias {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  username: string;
  mapCert: boolean;
  base64Cert: string;
  aliasInfo: GuestAuthAliasInfo;
}