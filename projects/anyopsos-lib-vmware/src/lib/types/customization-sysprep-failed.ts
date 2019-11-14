import {CustomizationFailed} from './customization-failed';

export interface CustomizationSysprepFailed extends CustomizationFailed {
  sysprepVersion: string;
  systemVersion: string;
}
