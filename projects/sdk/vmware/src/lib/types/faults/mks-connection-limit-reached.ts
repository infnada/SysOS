import {InvalidState} from './invalid-state';


export interface MksConnectionLimitReached extends InvalidState {
  connectionLimit: number;
}