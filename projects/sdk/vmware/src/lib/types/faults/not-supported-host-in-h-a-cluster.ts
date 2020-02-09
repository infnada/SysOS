import {NotSupportedHost} from './not-supported-host';


export interface NotSupportedHostInHACluster extends NotSupportedHost {
  build: string;
  hostName: string;
}