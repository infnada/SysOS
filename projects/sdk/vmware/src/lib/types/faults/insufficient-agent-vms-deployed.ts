import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface InsufficientAgentVmsDeployed extends InsufficientResourcesFault {
  currentNumAgentVms: number;
  hostName: string;
  requiredNumAgentVms: number;
}