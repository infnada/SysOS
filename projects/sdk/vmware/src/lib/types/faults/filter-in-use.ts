import {ResourceInUse} from './resource-in-use';

import {VirtualDiskId} from '../data/virtual-disk-id';

export interface FilterInUse extends ResourceInUse {
  disk?: VirtualDiskId[];
}