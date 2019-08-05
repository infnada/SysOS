import {FileBackedVirtualDiskSpec} from './file-backed-virtual-disk-spec';
import {Int} from './int';

export interface SeSparseVirtualDiskSpec extends FileBackedVirtualDiskSpec {
  grainSizeKb?: Int;
}
