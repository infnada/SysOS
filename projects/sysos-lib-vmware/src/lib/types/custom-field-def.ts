import {DynamicData} from './dynamic-data';

import {PrivilegePolicyDef} from './privilege-policy-def';
import {Int} from './int';
export interface CustomFieldDef extends DynamicData {
  fieldDefPrivileges?: PrivilegePolicyDef;
  fieldInstancePrivileges?: PrivilegePolicyDef;
  key: Int;
  managedObjectType?: string;
  name: string;
  type: string;
}
