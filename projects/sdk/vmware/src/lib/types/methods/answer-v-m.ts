import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AnswerVM {
  _this: ManagedObjectReference;
  questionId: string;
  answerChoice: string;
}