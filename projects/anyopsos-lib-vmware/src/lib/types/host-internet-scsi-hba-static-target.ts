import {DynamicData} from './dynamic-data';

import {HostInternetScsiHbaParamValue} from './host-internet-scsi-hba-param-value';
import {HostInternetScsiHbaAuthenticationProperties} from './host-internet-scsi-hba-authentication-properties';
import {HostInternetScsiHbaDigestProperties} from './host-internet-scsi-hba-digest-properties';
import {OptionDef} from './option-def';
import {Int} from './int';
export interface HostInternetScsiHbaStaticTarget extends DynamicData {
  address: string;
  advancedOptions?: HostInternetScsiHbaParamValue[];
  authenticationProperties?: HostInternetScsiHbaAuthenticationProperties;
  digestProperties?: HostInternetScsiHbaDigestProperties;
  discoveryMethod?: string;
  iScsiName: string;
  parent?: string;
  port?: Int;
  supportedAdvancedOptions?: OptionDef[];
}
