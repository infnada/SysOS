import {ManagedObjectReference} from '../data/managed-object-reference';
import {PrivilegePolicyDef} from '../data/privilege-policy-def';


export interface AddCustomFieldDef {
  _this: ManagedObjectReference;
  name: string;
  moType?: string;
  fieldDefPolicy?: PrivilegePolicyDef;
  fieldPolicy?: PrivilegePolicyDef;
}