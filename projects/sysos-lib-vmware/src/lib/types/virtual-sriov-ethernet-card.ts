import {VirtualEthernetCard} from './virtual-ethernet-card';

import {VirtualSriovEthernetCardSriovBackingInfo} from './virtual-sriov-ethernet-card-sriov-backing-info';
export interface VirtualSriovEthernetCard extends VirtualEthernetCard {
  allowGuestOSMtuChange?: boolean;
  sriovBacking?: VirtualSriovEthernetCardSriovBackingInfo;
}
