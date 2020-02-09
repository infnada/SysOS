import {ManagedObjectReference} from '../data/managed-object-reference';


export interface StartRecording_Task {
  _this: ManagedObjectReference;
  name: string;
  description?: string;
}