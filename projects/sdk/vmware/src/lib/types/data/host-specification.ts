import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {HostSubSpecification} from './host-sub-specification';

export interface HostSpecification extends DynamicData {
  changeID?: string;
  createdTime: string;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  lastModified?: string;
  subSpecs?: HostSubSpecification[];
}