import {ManagedObjectReference} from '../data/managed-object-reference';
import {Extension} from '../data/extension';


export interface RegisterExtension {
  _this: ManagedObjectReference;
  extension: Extension;
}