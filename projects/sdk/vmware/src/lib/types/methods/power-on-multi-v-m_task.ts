import {ManagedObjectReference} from '../data/managed-object-reference';
import {OptionValue} from '../data/option-value';


export interface PowerOnMultiVM_Task {
  _this: ManagedObjectReference;
  vm: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
  option?: OptionValue[];
}