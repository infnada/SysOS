import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateServiceMessage {
  _this: ManagedObjectReference;
  message: string;
}