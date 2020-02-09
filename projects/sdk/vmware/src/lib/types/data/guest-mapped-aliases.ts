import {DynamicData} from './dynamic-data';

import {GuestAuthSubject} from './guest-auth-subject';

export interface GuestMappedAliases extends DynamicData {
  base64Cert: string;
  subjects: GuestAuthSubject[];
  username: string;
}