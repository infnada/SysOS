import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface WaitOptions extends DynamicData {
  maxObjectUpdates?: Int;
  maxWaitSeconds?: Int;
}
