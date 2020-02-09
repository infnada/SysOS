import {DynamicData} from './dynamic-data';


export interface NegatableExpression extends DynamicData {
  negate?: boolean;
}