import {DynamicData} from './dynamic-data';

import {GuestAuthAliasInfo} from './guest-auth-alias-info';
export interface GuestAliases extends DynamicData {
  aliases: GuestAuthAliasInfo[];
}
