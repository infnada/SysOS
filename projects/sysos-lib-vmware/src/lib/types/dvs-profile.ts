import {ApplyProfile} from './apply-profile';

import {PnicUplinkProfile} from './pnic-uplink-profile';
export interface DvsProfile extends ApplyProfile {
  key: string;
  name: string;
  uplink?: PnicUplinkProfile[];
}
