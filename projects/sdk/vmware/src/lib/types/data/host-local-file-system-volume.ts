import {HostFileSystemVolume} from './host-file-system-volume';


export interface HostLocalFileSystemVolume extends HostFileSystemVolume {
  device: string;
}