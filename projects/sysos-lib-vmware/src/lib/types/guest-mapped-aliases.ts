import {DynamicData} from './dynamic-data';

import {GuestAuthSubject} from './guest-auth-subject';
export interface GuestMappedAliases extends DynamicData {
  subjects: GuestAuthSubject[];
  username: string;
}
