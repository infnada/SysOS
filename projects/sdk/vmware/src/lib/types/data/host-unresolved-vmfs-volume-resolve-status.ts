import {DynamicData} from './dynamic-data';


export interface HostUnresolvedVmfsVolumeResolveStatus extends DynamicData {
  incompleteExtents?: boolean;
  multipleCopies?: boolean;
  resolvable: boolean;
}