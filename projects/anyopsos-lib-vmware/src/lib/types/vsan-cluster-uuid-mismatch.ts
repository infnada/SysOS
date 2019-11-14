import {CannotMoveVsanEnabledHost} from './cannot-move-vsan-enabled-host';

export interface VsanClusterUuidMismatch extends CannotMoveVsanEnabledHost {
  destinationClusterUuid: string;
  hostClusterUuid: string;
}
