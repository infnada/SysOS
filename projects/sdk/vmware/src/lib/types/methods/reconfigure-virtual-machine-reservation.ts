import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualMachineMemoryReservationSpec} from '../data/virtual-machine-memory-reservation-spec';


export interface ReconfigureVirtualMachineReservation {
  _this: ManagedObjectReference;
  spec: VirtualMachineMemoryReservationSpec;
}