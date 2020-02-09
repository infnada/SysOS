import {InvalidDatastore} from './invalid-datastore';


export interface InaccessibleDatastore extends InvalidDatastore {
  detail?: string;
}