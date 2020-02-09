import {DynamicData} from './dynamic-data';

import {PrivilegePolicyDef} from './privilege-policy-def';

export interface CustomFieldDef extends DynamicData {
  fieldDefPrivileges?: PrivilegePolicyDef;
  fieldInstancePrivileges?: PrivilegePolicyDef;
  key: number;
  managedObjectType?: string;
  name: string;
  type: string;
}