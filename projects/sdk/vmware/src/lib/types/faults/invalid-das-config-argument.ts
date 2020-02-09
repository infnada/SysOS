import {InvalidArgument} from './invalid-argument';


export interface InvalidDasConfigArgument extends InvalidArgument {
  clusterName?: string;
  entry?: string;
}