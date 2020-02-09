import {HostFibreChannelHba} from './host-fibre-channel-hba';

import {HostFibreChannelOverEthernetHbaLinkInfo} from './host-fibre-channel-over-ethernet-hba-link-info';

export interface HostFibreChannelOverEthernetHba extends HostFibreChannelHba {
  isSoftwareFcoe: boolean;
  linkInfo: HostFibreChannelOverEthernetHbaLinkInfo;
  markedForRemoval: boolean;
  underlyingNic: string;
}