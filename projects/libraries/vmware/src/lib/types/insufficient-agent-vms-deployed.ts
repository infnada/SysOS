import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Int} from './int';

export interface InsufficientAgentVmsDeployed extends InsufficientResourcesFault {
  currentNumAgentVms: Int;
  hostName: string;
  requiredNumAgentVms: Int;
}
