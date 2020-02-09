import {InvalidState} from './invalid-state';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface NoActiveHostInCluster extends InvalidState {
  computeResource: ManagedObjectReference & { $type: 'ComputeResource'; };
}