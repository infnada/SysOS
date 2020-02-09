import {OvfManagerCommonParams} from './ovf-manager-common-params';

import {ManagedObjectReference} from './managed-object-reference';
import {OvfConsumerOstNode} from './ovf-consumer-ost-node';
import {OvfNetworkMapping} from './ovf-network-mapping';
import {KeyValue} from './key-value';
import {OvfResourceMap} from './ovf-resource-map';

export interface OvfCreateImportSpecParams extends OvfManagerCommonParams {
  diskProvisioning?: string;
  entityName: string;
  hostSystem?: ManagedObjectReference & { $type: 'HostSystem'; };
  instantiationOst?: OvfConsumerOstNode;
  ipAllocationPolicy?: string;
  ipProtocol?: string;
  networkMapping?: OvfNetworkMapping[];
  propertyMapping?: KeyValue[];
  resourceMapping?: OvfResourceMap[];
}