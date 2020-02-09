import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MarkPerenniallyReserved {
  _this: ManagedObjectReference;
  lunUuid: string;
  state: boolean;
}