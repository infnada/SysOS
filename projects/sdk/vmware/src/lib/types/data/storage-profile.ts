import {ApplyProfile} from './apply-profile';

import {NasStorageProfile} from './nas-storage-profile';

export interface StorageProfile extends ApplyProfile {
  nasStorage?: NasStorageProfile[];
}