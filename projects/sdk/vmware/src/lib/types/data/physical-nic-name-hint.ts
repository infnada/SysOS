import {PhysicalNicHint} from './physical-nic-hint';


export interface PhysicalNicNameHint extends PhysicalNicHint {
  network: string;
}