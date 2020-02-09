import {DynamicData} from './dynamic-data';

import {HostDiskPartitionLayout} from './host-disk-partition-layout';
import {HostDiagnosticPartitionCreateSpec} from './host-diagnostic-partition-create-spec';

export interface HostDiagnosticPartitionCreateDescription extends DynamicData {
  diskUuid: string;
  layout: HostDiskPartitionLayout;
  spec: HostDiagnosticPartitionCreateSpec;
}