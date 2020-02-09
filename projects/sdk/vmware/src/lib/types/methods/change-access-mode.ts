import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostAccessMode} from '../enums/host-access-mode';


export interface ChangeAccessMode {
  _this: ManagedObjectReference;
  principal: string;
  isGroup: boolean;
  accessMode: HostAccessMode;
}