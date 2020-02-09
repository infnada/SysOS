import {DynamicData} from './dynamic-data';

import {IscsiDependencyEntity} from './iscsi-dependency-entity';
import {IscsiStatus} from './iscsi-status';

export interface IscsiMigrationDependency extends DynamicData {
  dependency?: IscsiDependencyEntity[];
  disallowReason?: IscsiStatus;
  migrationAllowed: boolean;
}