import {ManagedObjectReference} from '../data/managed-object-reference';
import {DatastoreMountPathDatastorePair} from '../data/datastore-mount-path-datastore-pair';


export interface UpdateVirtualMachineFiles_Task {
  _this: ManagedObjectReference;
  mountPathDatastoreMapping: DatastoreMountPathDatastorePair[];
}