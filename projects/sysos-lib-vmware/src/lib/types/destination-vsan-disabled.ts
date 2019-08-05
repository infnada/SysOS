import {CannotMoveVsanEnabledHost} from './cannot-move-vsan-enabled-host';

export interface DestinationVsanDisabled extends CannotMoveVsanEnabledHost {
  destinationCluster: string;
}
