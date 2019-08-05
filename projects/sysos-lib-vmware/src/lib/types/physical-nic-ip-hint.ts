import {PhysicalNicHint} from './physical-nic-hint';

export interface PhysicalNicIpHint extends PhysicalNicHint {
  ipSubnet: string;
}
