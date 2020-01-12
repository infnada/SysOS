import {ClusterAction} from './cluster-action';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
import {Float} from './float';
export interface HbrDiskMigrationAction extends ClusterAction {
  collectionId: string;
  collectionName: string;
  destination: ManagedObjectReference & { $type: 'Datastore' };
  diskIds: string[];
  ioLatencyDstBefore?: Float;
  ioLatencySrcBefore?: Float;
  sizeTransferred: Long;
  source: ManagedObjectReference & { $type: 'Datastore' };
  spaceUtilDstAfter?: Float;
  spaceUtilDstBefore?: Float;
  spaceUtilSrcAfter?: Float;
  spaceUtilSrcBefore?: Float;
}
