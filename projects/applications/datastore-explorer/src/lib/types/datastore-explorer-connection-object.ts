import {VMWareDatastore} from '@anyopsos/module-node-vmware';
import {NetAppVolume} from '@anyopsos/module-node-netapp';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

export type DatastoreExplorerConnectionObject = DataObject & { info: { data: VMWareDatastore | NetAppVolume } }
