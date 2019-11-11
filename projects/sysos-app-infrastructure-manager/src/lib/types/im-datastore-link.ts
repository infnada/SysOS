import {ImConnection} from './im-connection';
import {NetAppVserver} from './netapp-vserver';
import {NetAppVolume} from './netapp-volume';

export interface IMDatastoreLink {
  storage: ImConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
}
