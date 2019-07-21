import {IMConnection} from './imconnection';
import {NetAppVserver} from './netapp-vserver';
import {NetAppVolume} from './netapp-volume';

export interface IMDatastoreLink {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
}
