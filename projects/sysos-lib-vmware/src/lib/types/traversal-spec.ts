import {SelectionSpec} from './selection-spec';

export interface TraversalSpec extends SelectionSpec {
  '$xsi:type': 'TraversalSpec';
  path: string;
  selectSet?: SelectionSpec[];
  skip?: boolean;
  type: string;
}
