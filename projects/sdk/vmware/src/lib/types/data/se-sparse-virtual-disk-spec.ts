import {FileBackedVirtualDiskSpec} from './file-backed-virtual-disk-spec';


export interface SeSparseVirtualDiskSpec extends FileBackedVirtualDiskSpec {
  grainSizeKb?: number;
}