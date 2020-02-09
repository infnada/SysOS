import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';
import {GuestAuthSubject} from '../data/guest-auth-subject';


export interface RemoveGuestAlias {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  username: string;
  base64Cert: string;
  subject: GuestAuthSubject;
}