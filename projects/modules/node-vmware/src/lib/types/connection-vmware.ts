import {Connection} from '@anyopsos/backend-core/app/types/connection';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {VMWareVM} from './vmware-vm';
import {VMWareDatastore} from './vmware-datastore';
import {VMWareHost} from './vmware-host';
import {VMWareDatacenter} from './vmware-datacenter';
import {VMWareFolder} from './vmware-folder';
import {VMWareResourcePool} from './vmware-resource-pool';

export interface ConnectionVmware extends Connection {
  type: 'vmware';
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
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
    Data: (DataObject & { info: { data: VMWareVM | VMWareDatastore | VMWareHost | VMWareDatacenter | VMWareFolder | VMWareResourcePool } })[];
  };
}
