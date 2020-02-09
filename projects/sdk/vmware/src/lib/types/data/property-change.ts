import {DynamicData} from './dynamic-data';

import {PropertyChangeOp} from '../enums/property-change-op';

export interface PropertyChange extends DynamicData {
  name: string;
  op: PropertyChangeOp;
  val?: any;
}