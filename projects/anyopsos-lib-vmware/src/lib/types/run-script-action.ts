import {Action} from './action';

export interface RunScriptAction extends Action {
  script: string;
}
