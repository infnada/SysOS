import {SelectionSet} from './selection-set';

export interface DVPortgroupSelection extends SelectionSet {
  dvsUuid: string;
  portgroupKey: string[];
}
