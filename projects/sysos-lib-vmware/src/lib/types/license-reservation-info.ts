import {DynamicData} from './dynamic-data';

import {LicenseReservationInfoState} from './license-reservation-info-state';
import {Int} from './int';
export interface LicenseReservationInfo extends DynamicData {
  key: string;
  required: Int;
  state: LicenseReservationInfoState;
}
