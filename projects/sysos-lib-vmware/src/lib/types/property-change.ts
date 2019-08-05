import {DynamicData} from './dynamic-data';

import {PropertyChangeOp} from './property-change-op';
export interface PropertyChange extends DynamicData {
  name: string;
  op: PropertyChangeOp;
  val?: any;
}
