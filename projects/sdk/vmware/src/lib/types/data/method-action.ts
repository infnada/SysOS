import {Action} from './action';

import {MethodActionArgument} from './method-action-argument';

export interface MethodAction extends Action {
  argument?: MethodActionArgument[];
  name: string;
}