import {InvalidState} from './invalid-state';
import {Int} from './int';

export interface MksConnectionLimitReached extends InvalidState {
  connectionLimit: Int;
}
