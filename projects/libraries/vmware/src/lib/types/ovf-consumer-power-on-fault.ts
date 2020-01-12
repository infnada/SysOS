import {InvalidState} from './invalid-state';

export interface OvfConsumerPowerOnFault extends InvalidState {
  description: string;
  extensionKey: string;
  extensionName: string;
}
