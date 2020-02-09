import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryMemoryOverhead {
  _this: ManagedObjectReference;
  memorySize: number;
  videoRamSize?: number;
  numVcpus: number;
}