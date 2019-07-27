import {SharesInfo} from './shares-info';

export interface ResourceAllocationInfo {
  expandableReservation?: boolean;
  limit?: number;
  overheadLimit?: number;
  reservation?: number;
  shares?: SharesInfo;
}
