import {ManagedObjectReference} from '../data/managed-object-reference';


export interface StartReplaying_Task {
  _this: ManagedObjectReference;
  replaySnapshot: ManagedObjectReference & { $type: 'VirtualMachineSnapshot'; };
}