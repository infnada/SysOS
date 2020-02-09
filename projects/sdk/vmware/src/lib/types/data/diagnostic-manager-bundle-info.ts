import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface DiagnosticManagerBundleInfo extends DynamicData {
  system?: ManagedObjectReference & { $type: 'HostSystem'; };
  url: string;
}