import {HostHostBusAdapter} from './host-host-bus-adapter';

import {HostInternetScsiHbaParamValue} from './host-internet-scsi-hba-param-value';
import {HostInternetScsiHbaAuthenticationCapabilities} from './host-internet-scsi-hba-authentication-capabilities';
import {HostInternetScsiHbaAuthenticationProperties} from './host-internet-scsi-hba-authentication-properties';
import {HostInternetScsiHbaSendTarget} from './host-internet-scsi-hba-send-target';
import {HostInternetScsiHbaStaticTarget} from './host-internet-scsi-hba-static-target';
import {HostInternetScsiHbaDigestCapabilities} from './host-internet-scsi-hba-digest-capabilities';
import {HostInternetScsiHbaDigestProperties} from './host-internet-scsi-hba-digest-properties';
import {HostInternetScsiHbaDiscoveryCapabilities} from './host-internet-scsi-hba-discovery-capabilities';
import {HostInternetScsiHbaDiscoveryProperties} from './host-internet-scsi-hba-discovery-properties';
import {HostInternetScsiHbaIPCapabilities} from './host-internet-scsi-hba-i-p-capabilities';
import {HostInternetScsiHbaIPProperties} from './host-internet-scsi-hba-i-p-properties';
import {HostInternetScsiHbaNetworkBindingSupportType} from './host-internet-scsi-hba-network-binding-support-type';
import {OptionDef} from './option-def';
import {Int} from './int';
export interface HostInternetScsiHba extends HostHostBusAdapter {
  advancedOptions?: HostInternetScsiHbaParamValue[];
  authenticationCapabilities: HostInternetScsiHbaAuthenticationCapabilities;
  authenticationProperties: HostInternetScsiHbaAuthenticationProperties;
  canBeDisabled?: boolean;
  configuredSendTarget?: HostInternetScsiHbaSendTarget[];
  configuredStaticTarget?: HostInternetScsiHbaStaticTarget[];
  currentSpeedMb?: Int;
  digestCapabilities?: HostInternetScsiHbaDigestCapabilities;
  digestProperties?: HostInternetScsiHbaDigestProperties;
  discoveryCapabilities: HostInternetScsiHbaDiscoveryCapabilities;
  discoveryProperties: HostInternetScsiHbaDiscoveryProperties;
  ipCapabilities: HostInternetScsiHbaIPCapabilities;
  ipProperties: HostInternetScsiHbaIPProperties;
  iScsiAlias?: string;
  iScsiName: string;
  isSoftwareBased: boolean;
  maxSpeedMb?: Int;
  networkBindingSupport?: HostInternetScsiHbaNetworkBindingSupportType;
  supportedAdvancedOptions?: OptionDef[];
}
