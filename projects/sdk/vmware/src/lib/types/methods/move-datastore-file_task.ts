import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MoveDatastoreFile_Task {
  _this: ManagedObjectReference;
  sourceName: string;
  sourceDatacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  destinationName: string;
  destinationDatacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  force?: boolean;
}