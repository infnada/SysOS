import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyValue} from '../data/key-value';


export interface AddLicense {
  _this: ManagedObjectReference;
  licenseKey: string;
  labels?: KeyValue[];
}