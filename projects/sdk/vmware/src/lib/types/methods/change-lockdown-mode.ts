import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostLockdownMode} from '../enums/host-lockdown-mode';


export interface ChangeLockdownMode {
  _this: ManagedObjectReference;
  mode: HostLockdownMode;
}