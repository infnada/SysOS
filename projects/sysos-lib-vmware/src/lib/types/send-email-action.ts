import {Action} from './action';

export interface SendEmailAction extends Action {
  body: string;
  ccList: string;
  subject: string;
  toList: string;
}
