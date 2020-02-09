import {DynamicData} from './dynamic-data';

import {GuestAuthSubject} from './guest-auth-subject';

export interface GuestAuthAliasInfo extends DynamicData {
  comment: string;
  subject: GuestAuthSubject;
}