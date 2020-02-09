import {DvsIpPort} from './dvs-ip-port';


export interface DvsSingleIpPort extends DvsIpPort {
  portNumber: number;
}