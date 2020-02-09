import {DynamicData} from './dynamic-data';

import {OvfConsumerOstNode} from './ovf-consumer-ost-node';
import {OvfDeploymentOption} from './ovf-deployment-option';
import {KeyValue} from './key-value';
import {LocalizedMethodFault} from './localized-method-fault';
import {OvfNetworkInfo} from './ovf-network-info';
import {VAppProductInfo} from './v-app-product-info';
import {VAppPropertyInfo} from './v-app-property-info';

export interface OvfParseDescriptorResult extends DynamicData {
  annotatedOst?: OvfConsumerOstNode;
  annotation: string;
  approximateDownloadSize?: number;
  approximateFlatDeploymentSize?: number;
  approximateSparseDeploymentSize?: number;
  defaultDeploymentOption: string;
  defaultEntityName: string;
  deploymentOption?: OvfDeploymentOption[];
  entityName?: KeyValue[];
  error?: LocalizedMethodFault[];
  eula?: string[];
  ipAllocationScheme?: string[];
  ipProtocols?: string[];
  network?: OvfNetworkInfo[];
  productInfo?: VAppProductInfo;
  property?: VAppPropertyInfo[];
  virtualApp: boolean;
  warning?: LocalizedMethodFault[];
}