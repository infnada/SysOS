import {DynamicData} from './dynamic-data';


export interface HostLocalFileSystemVolumeSpec extends DynamicData {
  device: string;
  localPath: string;
}