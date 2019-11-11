import {ImDataObject, NetAppVolume, VMWareDatastore, VMWareDatacenter} from '@sysos/app-infrastructure-manager';

export interface DatastoreExplorerConnection {
  uuid?: string;
  credential: string;
  host: string;
  port: number;
  type: string;
  data: {
    obj: ImDataObject & { info: { data: VMWareDatastore | NetAppVolume } };
    datacenter?: ImDataObject & { info: { data: VMWareDatacenter } };
  };
  state?: string;
}
