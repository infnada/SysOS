import {ClusterAction} from './cluster-action';

import {ManagedObjectReference} from './managed-object-reference';

export interface HbrDiskMigrationAction extends ClusterAction {
  collectionId: string;
  collectionName: string;
  destination: ManagedObjectReference & { $type: 'Datastore'; };
  diskIds: string[];
  ioLatencyDstBefore?: number;
  ioLatencySrcBefore?: number;
  sizeTransferred: number;
  source: ManagedObjectReference & { $type: 'Datastore'; };
  spaceUtilDstAfter?: number;
  spaceUtilDstBefore?: number;
  spaceUtilSrcAfter?: number;
  spaceUtilSrcBefore?: number;
}