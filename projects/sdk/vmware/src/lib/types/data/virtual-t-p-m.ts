import {VirtualDevice} from './virtual-device';


export interface VirtualTPM extends VirtualDevice {
  endorsementKeyCertificate?: string[];
  endorsementKeyCertificateSigningRequest?: string[];
}