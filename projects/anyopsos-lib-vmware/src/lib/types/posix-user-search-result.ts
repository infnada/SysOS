import {UserSearchResult} from './user-search-result';
import {Int} from './int';

export interface PosixUserSearchResult extends UserSearchResult {
  id: Int;
  shellAccess?: boolean;
}
