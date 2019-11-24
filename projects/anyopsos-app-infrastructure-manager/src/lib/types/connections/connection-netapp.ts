import {ImConnection} from './im-connection';
import {ImDataObject} from '../im-data-object';
import {NetAppVserver} from '../netapp-vserver';
import {NetAppVolume} from '../netapp-volume';
import {NetAppSnapshot} from '../netapp-snapshot';
import {NetAppIface} from '../netapp-iface';

export interface ConnectionNetapp extends ImConnection {
  type: 'netapp';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
  data: {
    Base: {
      name: string;
      buildtimestamp?: string;
      isclustered?: boolean;
      version?: string;
      versiontuple?: string;
      metrocluster?: string;
      cluster?: string;
      licenses?: string;
      ontapi_version?: string;
    };
    Data: (ImDataObject & { info: { data: NetAppVserver | NetAppVolume | NetAppSnapshot | NetAppIface } })[];
  };
}
