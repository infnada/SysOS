import {ManagedObjectReference} from '../data/managed-object-reference';
import {GuestAuthentication} from '../data/guest-authentication';


export interface ListProcessesInGuest {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  auth: GuestAuthentication;
  pids?: number[];
}