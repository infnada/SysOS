import {ManagedObjectReference} from '../data/managed-object-reference';
import {MethodFault} from '../faults/method-fault';


export interface HttpNfcLeaseAbort {
  _this: ManagedObjectReference;
  fault?: MethodFault;
}