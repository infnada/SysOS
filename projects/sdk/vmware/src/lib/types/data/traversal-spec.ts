import {SelectionSpec} from './selection-spec';


export interface TraversalSpec extends SelectionSpec {
  path: string;
  selectSet?: SelectionSpec[];
  skip?: boolean;
  type: string;
}