import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SessionIsActive {
  _this: ManagedObjectReference;
  sessionID: string;
  userName: string;
}