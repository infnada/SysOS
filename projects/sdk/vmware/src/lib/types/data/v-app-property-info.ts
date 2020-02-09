import {DynamicData} from './dynamic-data';


export interface VAppPropertyInfo extends DynamicData {
  category?: string;
  classId?: string;
  defaultValue?: string;
  description?: string;
  id?: string;
  instanceId?: string;
  key: number;
  label?: string;
  type?: string;
  typeReference?: string;
  userConfigurable?: boolean;
  value?: string;
}