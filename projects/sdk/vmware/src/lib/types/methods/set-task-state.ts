import {ManagedObjectReference} from '../data/managed-object-reference';
import {TaskInfoState} from '../enums/task-info-state';
import {MethodFault} from '../faults/method-fault';


export interface SetTaskState {
  _this: ManagedObjectReference;
  state: TaskInfoState;
  result?: any;
  fault?: MethodFault;
}