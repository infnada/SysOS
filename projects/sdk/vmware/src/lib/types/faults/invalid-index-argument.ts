import {InvalidArgument} from './invalid-argument';


export interface InvalidIndexArgument extends InvalidArgument {
  key: string;
}