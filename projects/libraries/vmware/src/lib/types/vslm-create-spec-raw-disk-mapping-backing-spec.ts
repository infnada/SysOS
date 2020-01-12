import {VslmCreateSpecBackingSpec} from './vslm-create-spec-backing-spec';

export interface VslmCreateSpecRawDiskMappingBackingSpec extends VslmCreateSpecBackingSpec {
  compatibilityMode: string;
  lunUuid: string;
}
