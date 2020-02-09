import {ManagedObjectReference} from '../data/managed-object-reference';
import {Extension} from '../data/extension';


export interface UpdateExtension {
  _this: ManagedObjectReference;
  extension: Extension;
}