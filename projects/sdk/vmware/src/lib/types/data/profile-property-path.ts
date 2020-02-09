import {DynamicData} from './dynamic-data';


export interface ProfilePropertyPath extends DynamicData {
  parameterId?: string;
  policyId?: string;
  policyOptionId?: string;
  profilePath: string;
}