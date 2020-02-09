import {DynamicData} from './dynamic-data';

import {VMwareVspanPort} from './v-mware-vspan-port';

export interface VMwareVspanSession extends DynamicData {
  description?: string;
  destinationPort?: VMwareVspanPort;
  enabled: boolean;
  encapsulationVlanId?: number;
  encapType?: string;
  erspanCOS?: number;
  erspanGraNanosec?: boolean;
  erspanId?: number;
  key?: string;
  mirroredPacketLength?: number;
  name?: string;
  netstack?: string;
  normalTrafficAllowed: boolean;
  samplingRate?: number;
  sessionType?: string;
  sourcePortReceived?: VMwareVspanPort;
  sourcePortTransmitted?: VMwareVspanPort;
  stripOriginalVlan: boolean;
}