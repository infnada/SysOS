import {InvalidState} from './invalid-state';


export interface QuestionPending extends InvalidState {
  text: string;
}