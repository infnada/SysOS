import {Connection} from '@anyopsos/backend-core/app/types/connection';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {NetAppVserver} from './netapp-vserver';
import {NetAppVolume} from './netapp-volume';
import {NetAppSnapshot} from './netapp-snapshot';
import {NetAppIface} from './netapp-iface';

export interface ConnectionNetapp extends Connection {
  type: 'netapp';
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
  data: {
    Base: {
      name: string;
      buildTimestamp?: string;
      isClustered?: boolean;
      version?: string;
      versionTuple?: string;
      metroCluster?: string;
      cluster?: string;
      licenses?: string;
      ontapiVersion?: string;
    };
    Data: (DataObject & { info: { data: NetAppVserver | NetAppVolume | NetAppSnapshot | NetAppIface } })[];
  };
}
