import {DvsIpPort} from './dvs-ip-port';
import {Int} from './int';

export interface DvsIpPortRange extends DvsIpPort {
  endPortNumber: Int;
  startPortNumber: Int;
}
