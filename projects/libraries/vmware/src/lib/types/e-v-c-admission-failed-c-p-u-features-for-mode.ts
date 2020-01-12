import {EVCAdmissionFailed} from './e-v-c-admission-failed';

export interface EVCAdmissionFailedCPUFeaturesForMode extends EVCAdmissionFailed {
  currentEVCModeKey: string;
}
