import {InvalidState} from './invalid-state';

import {ManagedObjectReference} from './managed-object-reference';
export interface NoActiveHostInCluster extends InvalidState {
  computeResource: ManagedObjectReference & { $type: 'ComputeResource' };
}
