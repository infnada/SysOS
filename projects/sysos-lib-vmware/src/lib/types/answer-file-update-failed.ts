import {VimFault} from './vim-fault';

import {AnswerFileUpdateFailure} from './answer-file-update-failure';
export interface AnswerFileUpdateFailed extends VimFault {
  failure: AnswerFileUpdateFailure[];
}
