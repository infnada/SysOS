import {NetAppVolume, VMWareObject, VMWareDatastore} from '@sysos/app-infrastructure-manager';

export interface DatastoreExplorerConnection {
  uuid?: string;
  credential: string;
  host: string;
  port: number;
  type: string;
  data: {
    datastore?: VMWareObject & { info: { data: VMWareDatastore } };
    datacenter?: string;
    volume?: NetAppVolume
  };
  state?: string;
}
