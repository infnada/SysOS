import {VirtualDevice} from './virtual-device';

import {VirtualEthernetCardResourceAllocation} from './virtual-ethernet-card-resource-allocation';
export interface VirtualEthernetCard extends VirtualDevice {
  addressType?: string;
  externalId?: string;
  macAddress?: string;
  resourceAllocation?: VirtualEthernetCardResourceAllocation;
  uptCompatibilityEnabled?: boolean;
  wakeOnLanEnabled?: boolean;
}
