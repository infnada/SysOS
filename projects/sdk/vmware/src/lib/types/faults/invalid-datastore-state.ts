import {InvalidState} from './invalid-state';


export interface InvalidDatastoreState extends InvalidState {
  datastoreName?: string;
}