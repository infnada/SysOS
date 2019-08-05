import {DvsIpPort} from './dvs-ip-port';
import {Int} from './int';

export interface DvsSingleIpPort extends DvsIpPort {
  portNumber: Int;
}
