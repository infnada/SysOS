import {ManagedObjectReference} from '../data/managed-object-reference';
import {OptionValue} from '../data/option-value';


export interface UpdateOptions {
  _this: ManagedObjectReference;
  changedValue: OptionValue[];
}