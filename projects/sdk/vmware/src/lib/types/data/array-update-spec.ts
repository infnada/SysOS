import {DynamicData} from './dynamic-data';

import {ArrayUpdateOperation} from '../enums/array-update-operation';

export interface ArrayUpdateSpec extends DynamicData {
  operation: ArrayUpdateOperation;
  removeKey?: any;
}