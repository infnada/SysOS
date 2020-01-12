import {DynamicData} from './dynamic-data';

import {VMwareVspanPort} from './v-mware-vspan-port';
import {Int} from './int';
export interface VMwareVspanSession extends DynamicData {
  description?: string;
  destinationPort?: VMwareVspanPort;
  enabled: boolean;
  encapsulationVlanId?: Int;
  encapType?: string;
  erspanCOS?: Int;
  erspanGraNanosec?: boolean;
  erspanId?: Int;
  key?: string;
  mirroredPacketLength?: Int;
  name?: string;
  netstack?: string;
  normalTrafficAllowed: boolean;
  samplingRate?: Int;
  sessionType?: string;
  sourcePortReceived?: VMwareVspanPort;
  sourcePortTransmitted?: VMwareVspanPort;
  stripOriginalVlan: boolean;
}
