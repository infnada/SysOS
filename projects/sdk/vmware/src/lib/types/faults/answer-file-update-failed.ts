import {VimFault} from './vim-fault';

import {AnswerFileUpdateFailure} from '../data/answer-file-update-failure';

export interface AnswerFileUpdateFailed extends VimFault {
  failure: AnswerFileUpdateFailure[];
}