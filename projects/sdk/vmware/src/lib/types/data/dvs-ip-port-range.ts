import {DvsIpPort} from './dvs-ip-port';


export interface DvsIpPortRange extends DvsIpPort {
  endPortNumber: number;
  startPortNumber: number;
}