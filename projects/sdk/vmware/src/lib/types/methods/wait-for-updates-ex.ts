import {ManagedObjectReference} from '../data/managed-object-reference';
import {WaitOptions} from '../data/wait-options';


export interface WaitForUpdatesEx {
  _this: ManagedObjectReference;
  version?: string;
  options?: WaitOptions;
}