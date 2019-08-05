import {VslmMigrateSpec} from './vslm-migrate-spec';

export interface VslmCloneSpec extends VslmMigrateSpec {
  keepAfterDeleteVm?: boolean;
  name: string;
}
