import {NetAppVolume} from './netapp-volume';

export interface NetAppVserver {
  'vserver-name': string;
  Volumes?: NetAppVolume[];
}
