import {ImConnection} from './im-connection';
import {ImDataObject} from '../im-data-object';
import {VMWareVM} from '../vmware-vm';
import {VMWareDatastore} from '../vmware-datastore';
import {VMWareHost} from '../vmware-host';
import {VMWareDatacenter} from '../vmware-datacenter';
import {VMWareFolder} from '../vmware-folder';
import {VMWareResourcePool} from '../vmware-resource-pool';

export interface ConnectionVmware extends ImConnection {
  type: 'vmware';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
  data: {
    nextVersion: number;
    Base: {
      name: string;
      apiVersion?: string;
      downloadUrl?: string;
      exactVersion?: string;
      flexClientVersion?: string;
      patchVersion?: string;
      version?: string;
      authdPort?: string;
      type?: 'ESXi' | 'vCenter';
    };
    Data: (ImDataObject & { info: { data: VMWareVM | VMWareDatastore | VMWareHost | VMWareDatacenter | VMWareFolder | VMWareResourcePool } })[];
  };
}
