import {AnswerFileCreateSpec} from './answer-file-create-spec';


export interface AnswerFileSerializedCreateSpec extends AnswerFileCreateSpec {
  answerFileConfigString: string;
}