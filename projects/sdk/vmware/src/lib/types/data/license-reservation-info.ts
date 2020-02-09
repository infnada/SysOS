import {DynamicData} from './dynamic-data';

import {LicenseReservationInfoState} from '../enums/license-reservation-info-state';

export interface LicenseReservationInfo extends DynamicData {
  key: string;
  required: number;
  state: LicenseReservationInfoState;
}