import {DynamicData} from './dynamic-data';


export interface VMwareIpfixConfig extends DynamicData {
  activeFlowTimeout: number;
  collectorIpAddress?: string;
  collectorPort?: number;
  idleFlowTimeout: number;
  internalFlowsOnly: boolean;
  observationDomainId?: number;
  samplingRate: number;
}