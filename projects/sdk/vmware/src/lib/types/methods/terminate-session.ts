import {ManagedObjectReference} from '../data/managed-object-reference';


export interface TerminateSession {
  _this: ManagedObjectReference;
  sessionId: string[];
}