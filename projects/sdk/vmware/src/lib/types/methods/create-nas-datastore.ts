import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostNasVolumeSpec} from '../data/host-nas-volume-spec';


export interface CreateNasDatastore {
  _this: ManagedObjectReference;
  spec: HostNasVolumeSpec;
}