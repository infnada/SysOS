import {HostFileSystemVolume} from './host-file-system-volume';


export interface HostPMemVolume extends HostFileSystemVolume {
  uuid: string;
  version: string;
}