import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {HostSubSpecification} from './host-sub-specification';
import {DateTime} from './date-time';
export interface HostSpecification extends DynamicData {
  changeID?: string;
  createdTime: DateTime;
  host: ManagedObjectReference & { $type: 'HostSystem' };
  lastModified?: DateTime;
  subSpecs?: HostSubSpecification[];
}
