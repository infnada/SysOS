import {Event} from './event';

export interface NetworkRollbackEvent extends Event {
  methodName: string;
  transactionId: string;
}
