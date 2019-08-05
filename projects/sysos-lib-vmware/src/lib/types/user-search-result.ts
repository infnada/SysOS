import {DynamicData} from './dynamic-data';

export interface UserSearchResult extends DynamicData {
  fullName?: string;
  group: boolean;
  principal: string;
}
