import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VAppPropertyInfo extends DynamicData {
  category?: string;
  classId?: string;
  defaultValue?: string;
  description?: string;
  id?: string;
  instanceId?: string;
  key: Int;
  label?: string;
  type?: string;
  typeReference?: string;
  userConfigurable?: boolean;
  value?: string;
}
