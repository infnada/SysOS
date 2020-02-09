import {UserSearchResult} from './user-search-result';


export interface PosixUserSearchResult extends UserSearchResult {
  id: number;
  shellAccess?: boolean;
}