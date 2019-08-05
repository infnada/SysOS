import {DynamicData} from './dynamic-data';

export interface GuestRegKeyNameSpec extends DynamicData {
  registryPath: string;
  wowBitness: string;
}
