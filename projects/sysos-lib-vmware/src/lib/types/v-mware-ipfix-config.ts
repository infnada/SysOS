import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface VMwareIpfixConfig extends DynamicData {
  activeFlowTimeout: Int;
  collectorIpAddress?: string;
  collectorPort?: Int;
  idleFlowTimeout: Int;
  internalFlowsOnly: boolean;
  observationDomainId?: Long;
  samplingRate: Int;
}
