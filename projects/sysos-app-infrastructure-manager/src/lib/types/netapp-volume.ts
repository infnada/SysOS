import {NetAppSnapshot} from './netapp-snapshot';

export interface NetAppVolume {
  'volume-id-attributes': {
    name: string;
    node: string;
    uuid: string;
    'junction-path': string;
  };
  Snapshots?: NetAppSnapshot[];
}
