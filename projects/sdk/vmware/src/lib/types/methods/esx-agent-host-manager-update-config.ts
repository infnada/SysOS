import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostEsxAgentHostManagerConfigInfo} from '../data/host-esx-agent-host-manager-config-info';


export interface EsxAgentHostManagerUpdateConfig {
  _this: ManagedObjectReference;
  configInfo: HostEsxAgentHostManagerConfigInfo;
}