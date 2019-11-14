import {VimFault} from './vim-fault';

import {ProfileUpdateFailedUpdateFailure} from './profile-update-failed-update-failure';
export interface ProfileUpdateFailed extends VimFault {
  failure: ProfileUpdateFailedUpdateFailure[];
  warnings?: ProfileUpdateFailedUpdateFailure[];
}
